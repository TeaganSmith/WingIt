# services/flights.py
from services.ai_worker.llm_parser import parse_destination
import requests
import json


DUFFEL_ACCESS_TOKEN = os.getenv("DUFFEL_ACCESS_TOKEN")

def search_and_format_flights(destinations, origin_code, depart_date, return_date):
    url = "https://api.duffel.com/air/offer_requests"
    headers = {
        "Authorization": f"Bearer {DUFFEL_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "Duffel-Version": "v2"
    }

    results = {
        "origin": origin_code,
        "depart_date": depart_date,
        "return_date": return_date,
        "destinations": []
    }

    for dest in destinations.get("destinations", []):
        city_name = dest["city_name"]
        airport_code = dest["airport_code"]
        attractions = [
            dest.get("attraction_1"),
            dest.get("attraction_2"),
            dest.get("attraction_3")
        ]

        payload = {
            "slices": [
                {"origin": origin_code, "destination": airport_code, "departure_date": depart_date},
                {"origin": airport_code, "destination": origin_code, "departure_date": return_date}
            ],
            "passengers": [
                {
                    "type": "adult",
                    "family_name": "Earhart",
                    "given_name": "Amelia",
                    "loyalty_programme_accounts": [{"account_number": "12901014", "airline_iata_code": "AA"}]
                }
            ],
            "max_connections": 0,
            "cabin_class": "economy",
            "return_offers": True
        }

        response = requests.post(url, headers=headers, json={"data": payload})

        # <-- FIX HERE: 200 or 201 are success
        if response.status_code not in (200, 201):
            print(f"Error for {airport_code}: {response.status_code}, {response.text}")
            results["destinations"].append({
                "city_name": city_name,
                "airport_code": airport_code,
                "attractions": attractions,
                "flight_offers": []
            })
            continue

        data = response.json()
        offers = data.get("data", {}).get("offers", [])

        # Format the top 3 offers
        formatted_offers = []
        for offer in offers[:3]:
            slice_details = []
            for slice_ in offer["slices"]:
                # Get first and last segment to show departure/arrival
                first_seg = slice_["segments"][0]
                last_seg = slice_["segments"][-1]
                
                slice_details.append({
                    "origin_iata": first_seg["origin"].get("iata_code"),
                    "destination_iata": last_seg["destination"].get("iata_code"),
                    "departing_at": first_seg["departing_at"],
                    "arriving_at": last_seg["arriving_at"],
                    "slice_duration": slice_.get("duration"),
                })

            formatted_offers.append({
                "offer_id": offer["id"],
                "total_price": offer["total_amount"],
                "currency": offer["total_currency"],
                "slices": slice_details,
                "airline_name": offer["owner"]["name"]
            })

        results["destinations"].append({
            "city_name": city_name,
            "airport_code": airport_code,
            "attractions": attractions,
            "flight_offers": formatted_offers
        })

    return results



if __name__ == "__main__":
    # AI worker output
    user_input = "i want to go eat sushi and cool japanese food"
    parsed_destinations = parse_destination(user_input)

    # 2) Then call your search_and_format_flights
    origin = "JFK"
    depart_date = "2025-05-01"
    return_date = "2025-05-10"

    results = search_and_format_flights(
        parsed_destinations,
        origin,
        depart_date,
        return_date
    )

