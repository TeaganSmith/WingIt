#app.py
import json
from concurrent.futures import ThreadPoolExecutor
from services.flights import search_and_format_flights
from services.stays import search_and_format_hotels
from services.experiences import search_and_filter_activities
from services.ai_worker.llm_parser import parse_destination  # Assuming the parser is shared by both services

# Function to generate a master itinerary
def generate_itinerary(user_input, origin_code, check_in_date, check_out_date):
    # Parse destinations from user input
    parsed_destinations = parse_destination(user_input)

    # Step 1: Use check-in and check-out dates for flight departure and return dates
    depart_date = check_in_date
    return_date = check_out_date

    # Step 2: Run API calls in parallel
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

        # Wait for results
        flight_results = future_flights.result()
        hotel_results = future_hotels.result()
        activity_results = future_activities.result()

    # Step 3: Build the final itinerary
    itinerary = {
        "origin": origin_code,
        "depart_date": depart_date,
        "return_date": return_date,
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
        "destinations": []
    }

    # Combine results from flights, hotels, and activities
    for flight_dest in flight_results.get("destinations", []):
        city_name = flight_dest["city_name"]
        airport_code = flight_dest["airport_code"]
        attractions = flight_dest.get("attractions", [])
        flight_offers = flight_dest.get("flight_offers", [])

        # Find matching hotel data for this city
        matching_hotel_dest = next(
            (hotel_dest for hotel_dest in hotel_results.get("destinations", [])
             if hotel_dest["city_name"] == city_name),
            None
        )
        hotel_offers = matching_hotel_dest.get("hotel_offers", []) if matching_hotel_dest else []

        # Find matching activity data for this city
        matching_activity_dest = next(
            (act_dest for act_dest in activity_results.get("destinations", [])
             if act_dest["city_name"] == city_name),
            None
        )
        matched_experiences = matching_activity_dest["activities"].get("matched_experiences", []) if matching_activity_dest else []

        # Combine into one destination entry
        itinerary["destinations"].append({
            "city_name": city_name,
            "airport_code": airport_code,
            "attractions": attractions,
            "flight_offers": flight_offers,
            "hotel_offers": hotel_offers,
            "matched_experiences": matched_experiences
        })

    return itinerary

if __name__ == "__main__":
    # Collect user input
    user_input = input("Enter your trip preferences...").strip()
    origin_code = input("Enter your origin airport code...").strip().upper()
    check_in_date = input("Enter your hotel check-in date (YYYY-MM-DD): ").strip()
    check_out_date = input("Enter your hotel check-out date (YYYY-MM-DD): ").strip()

    # Generate the itinerary
    itinerary = generate_itinerary(user_input, origin_code, check_in_date, check_out_date)

    # Print the JSON
    print(json.dumps(itinerary, indent=2))

