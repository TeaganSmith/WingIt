import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from services.ai_worker.llm_parser import parse_destination
from services.ai_worker.llm_determination import match_experiences_to_description

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

# Function to fetch tours and activities
def get_tours_and_activities(lat, lon, access_token, radius=15, page_limit=20):
    """
    Fetch tours and activities near the given latitude and longitude.
    """
    url = "https://test.api.amadeus.com/v1/shopping/activities"
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {
        "latitude": lat,
        "longitude": lon,
        "radius": radius,  # Radius in kilometers
        "page[limit]": page_limit  # Number of results per page
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching tours and activities: {response.json()}")
        return None

def limit_experiences(experiences, max_items=55):
    """
    Limit the number of experiences to the given max_items.
    """
    return experiences[:max_items]

def fetch_and_process_destination(destination, token, user_input):
    """
    Fetch activities for a single destination and filter them using the AI worker.
    """
    city_name = destination["city_name"]
    latitude = destination["latitude"]
    longitude = destination["longitude"]

    # Fetch activities
    activities_data = get_tours_and_activities(latitude, longitude, token)
    if not activities_data or "data" not in activities_data:
        print(f"No activities found for {city_name}.")
        return {
            "city_name": city_name,
            "activities": []
        }

    # Prepare the activities list
    activities = [
        {
            "name": activity["name"],
            "description": activity.get("shortDescription", "No description available"),
            "price": activity.get("price", {}).get("amount", "N/A"),
            "currency": activity.get("price", {}).get("currencyCode", "USD"),
            "latitude": activity["geoCode"]["latitude"],
            "longitude": activity["geoCode"]["longitude"],
            "url": activity.get("bookingLink", "No booking link available")
        }
        for activity in activities_data["data"]
    ]

    activities = limit_experiences(activities)

    # Use the AI worker to filter the best activities
    filtered_activities = match_experiences_to_description(user_input, activities)

    return {
        "city_name": city_name,
        "activities": filtered_activities
    }

def search_and_filter_activities(user_input):
    """
    Search for destinations based on user input, fetch activities for each destination,
    and filter them using the AI worker in parallel.
    """
    # Parse user input to get destinations
    parsed_destinations = parse_destination(user_input)

    # Get Amadeus API access token
    token = get_access_token(API_KEY, API_SECRET)
    if not token:
        print("Unable to authenticate with Amadeus API.")
        return

    # Initialize the result structure
    results = {"user_input": user_input, "destinations": []}

    # Use ThreadPoolExecutor to fetch activities in parallel
    with ThreadPoolExecutor() as executor:
        future_to_destination = {
            executor.submit(fetch_and_process_destination, destination, token, user_input): destination
            for destination in parsed_destinations.get("destinations", [])
        }

        for future in as_completed(future_to_destination):
            result = future.result()
            if result:
                results["destinations"].append(result)

    return results

# Run the script
if __name__ == "__main__":
    user_input = "I want a relaxing beach vacation with snorkeling"
    results = search_and_filter_activities(user_input)
    print(json.dumps(results, indent=2))
