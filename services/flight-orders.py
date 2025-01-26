import json
import requests

DUFFEL_ACCESS_TOKEN = os.getenv("DUFFEL_ACCESS_TOKEN")

def create_order(offer_id, passengers):
    """
    Create a flight booking order with Duffel's API.
    """
    url = "https://api.duffel.com/air/orders"
    headers = {
        "Authorization": f"Bearer {DUFFEL_ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "Duffel-Version": "v2"
    }

    payload = {
        "data": {
            "offer_id": offer_id,
            "passengers": passengers,
            "payments": [
                {
                    "type": "balance",  # Use Duffel's balance to pay
                    "currency": "USD",
                    "amount": "0.00"  # Replace with actual payment amount for non-hold bookings
                }
            ]
        }
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code in (200, 201):
        return response.json()  # Successful booking response
    else:
        print(f"Error creating order: {response.status_code}, {response.text}")
        return None
