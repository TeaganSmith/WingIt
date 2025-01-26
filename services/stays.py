import requests
import json
from services.ai_worker.llm_parser import parse_destination  # Assuming this is the LLM parser module

# Amadeus API credentials
API_KEY = os.getenv("AMADEUS_API_KEY")
API_SECRET = os.getenv("AMADEUS_API_SECRET")

# Function to get an access token
def get_access_token(api_key, api_secret):
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "client_id": api_key,
        "client_secret": api_secret
    }

    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print("Error fetching access token:", response.json())
        return None

# Function to fetch hotels by city
def get_hotels_by_city(city_code, access_token):
    url = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city"
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"cityCode": city_code}

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error fetching hotels:", response.json())
        return None

# Function to fetch hotel offers for multiple hotels in a single batch
def get_hotel_offers(hotel_ids, access_token, check_in_date, check_out_date):
    url = "https://test.api.amadeus.com/v3/shopping/hotel-offers"
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {
        "hotelIds": ",".join(hotel_ids),  # Batch up to 25 hotel IDs
        "adults": 1,
        "roomQuantity": 1,
        "checkInDate": check_in_date,
        "checkOutDate": check_out_date,
        "currency": "USD"
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching offers for hotels {hotel_ids}: {response.json()}")
        return None

# Main function
def search_and_format_hotels(user_input, check_in_date, check_out_date):
    # Parse user input using the LLM parser
    destinations = parse_destination(user_input)

    # Get Amadeus API access token
    token = get_access_token(API_KEY, API_SECRET)
    if not token:
        print("Unable to authenticate with Amadeus API.")
        return

    # Initialize the result structure
    results = {
        "origin": "JFK",  # Replace with dynamic origin if needed
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
        "destinations": []
    }

    # Process each destination
    for dest in destinations.get("destinations", []):
        city_name = dest["city_name"]
        city_code = dest["city_code"]
        attractions = [
            dest.get("attraction_1"),
            dest.get("attraction_2"),
            dest.get("attraction_3")
        ]

        # Fetch hotels for the city
        hotels_data = get_hotels_by_city(city_code, token)
        if not hotels_data or "data" not in hotels_data:
            print(f"No hotels found in {city_name}.")
            results["destinations"].append({
                "city_name": city_name,
                "city_code": city_code,
                "attractions": attractions,
                "hotel_offers": []
            })
            continue

        # Collect up to 25 hotel IDs for batching
        hotel_ids = [hotel["hotelId"] for hotel in hotels_data["data"][:25]]  # Limit to 25 hotel IDs

        # Fetch offers for all hotels in a batch
        offers_data = get_hotel_offers(hotel_ids, token, check_in_date, check_out_date)
        if not offers_data or "data" not in offers_data:
            print(f"No offers found for hotels in {city_name}.")
            results["destinations"].append({
                "city_name": city_name,
                "city_code": city_code,
                "attractions": attractions,
                "hotel_offers": []
            })
            continue

        # Find the cheapest offer
        cheapest_offer = None
        for hotel_offer in offers_data["data"]:
            for offer in hotel_offer.get("offers", []):
                price = float(offer["price"]["total"])
                if cheapest_offer is None or price < float(cheapest_offer["price"]["total"]):
                    cheapest_offer = {
                        "hotel_name": hotel_offer["hotel"]["name"],
                        "hotel_id": hotel_offer["hotel"]["hotelId"],
                        "price": offer["price"],
                        "check_in": offer["checkInDate"],
                        "check_out": offer["checkOutDate"]
                    }

        # Add to results
        if cheapest_offer:
            results["destinations"].append({
                "city_name": city_name,
                "city_code": city_code,
                "attractions": attractions,
                "hotel_offers": [cheapest_offer]
            })
        else:
            results["destinations"].append({
                "city_name": city_name,
                "city_code": city_code,
                "attractions": attractions,
                "hotel_offers": []
            })

        # Stop at 3 destinations
        if len(results["destinations"]) >= 3:
            break

    return results

# Run the script
if __name__ == "__main__":
    user_input = "I want to stay near the mountains"
    check_in_date = "2025-02-02"
    check_out_date = "2025-02-06"

    hotel_results = search_and_format_hotels(user_input, check_in_date, check_out_date)
    print(json.dumps(hotel_results, indent=2))
