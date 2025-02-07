import json
import os
import logging
from flask import Flask, request, jsonify, send_from_directory
from concurrent.futures import ThreadPoolExecutor
from services.flights import search_and_format_flights
from services.stays import search_and_format_hotels
from services.experiences import search_and_filter_activities
from services.ai_worker.llm_parser import parse_destination
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React Native app

# Define the directory to store the JSON file
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'output')

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def build_itinerary(user_input, origin_code, check_in_date, check_out_date):
    logging.debug("Parsing destinations from user input.")
    parsed_destinations = parse_destination(user_input)
    logging.debug(f"Parsed Destinations: {parsed_destinations}")

    depart_date = check_in_date
    return_date = check_out_date

    with ThreadPoolExecutor() as executor:
        future_flights = executor.submit(
            search_and_format_flights,
            destinations=parsed_destinations,
            origin_code=origin_code,
            depart_date=depart_date,
            return_date=return_date
        )
        future_hotels = executor.submit(
            search_and_format_hotels,
            user_input=user_input,
            check_in_date=check_in_date,
            check_out_date=check_out_date
        )
        future_activities = executor.submit(
            search_and_filter_activities,
            user_input
        )

        flight_results = future_flights.result()
        hotel_results = future_hotels.result()
        activity_results = future_activities.result()

    itinerary = {
        "origin": origin_code,
        "depart_date": depart_date,
        "return_date": return_date,
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
        "destinations": []
    }

    for flight_dest in flight_results.get("destinations", []):
        city_name = flight_dest["city_name"]
        airport_code = flight_dest["airport_code"]
        attractions = flight_dest.get("attractions", [])
        flight_offers = flight_dest.get("flight_offers", [])

        # Find matching hotel and activity data for this city
        matching_hotel_dest = next(
            (hotel_dest for hotel_dest in hotel_results.get("destinations", [])
             if hotel_dest["city_name"] == city_name),
            None
        )
        hotel_offers = matching_hotel_dest.get("hotel_offers", []) if matching_hotel_dest else []

        matching_activity_dest = next(
            (act_dest for act_dest in activity_results.get("destinations", [])
             if act_dest["city_name"] == city_name),
            None
        )
        matched_experiences = matching_activity_dest["activities"].get("matched_experiences", []) if matching_activity_dest else []

        # Find the description from parsed_destinations
        matching_parsed_dest = next(
            (parsed_dest for parsed_dest in parsed_destinations.get("destinations", [])
             if parsed_dest["city_name"] == city_name),
            None
        )
        description = matching_parsed_dest.get("description", "No description available") if matching_parsed_dest else "No description available"

        # Combine into one destination entry
        itinerary["destinations"].append({
            "city_name": city_name,
            "airport_code": airport_code,
            "description": description,
            "attractions": attractions,
            "flight_offers": flight_offers,
            "hotel_offers": hotel_offers,
            "matched_experiences": matched_experiences
        })

    logging.debug(f"Final Itinerary: {itinerary}")

    # Save the itinerary to a JSON file
    itinerary_path = os.path.join(OUTPUT_DIR, 'itinerary.json')
    with open(itinerary_path, 'w') as f:
        json.dump(itinerary, f, indent=2)

    return itinerary

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary_endpoint():
    try:
        data = request.json
        user_input = data.get('user_input')
        origin_code = data.get('origin_code')
        check_in_date = data.get('check_in_date')
        check_out_date = data.get('check_out_date')

        # Generate the itinerary
        itinerary = build_itinerary(user_input, origin_code, check_in_date, check_out_date)

        # Return a success response
        return jsonify({
            "itinerary": itinerary,
            "status": "complete"
        }), 200

    except Exception as e:
        logging.exception("Error generating itinerary")
        return jsonify({
            "error": str(e),
            "status": "failed"
        }), 500

@app.route('/itinerary.json', methods=['GET'])
def get_itinerary_json():
    try:
        return send_from_directory(OUTPUT_DIR, 'itinerary.json', as_attachment=False)
    except Exception as e:
        logging.exception("Error sending itinerary.json")
        return jsonify({
            "error": str(e),
            "status": "failed"
        }), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
