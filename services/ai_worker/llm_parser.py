# ai_worker/llm_parser.py

import os
import json
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
SYSTEM_PROMPT = """
You are a travel assistant with expert knowledge of worldwide destinations, IATA airport codes, 
and approximate geographic coordinates.

When the user describes a desired destination or type of location (e.g., "I want a tropical place," 
"I want to visit the Bahamas," "Take me to Venice"), you will respond with up to three suggested 
locations, each with the following keys:

- city_name: the city (or region) name, for example "Nassau"
- airport_code: the primary 3-letter IATA code for that location, for example "NAS"
- city code: a string code that represents the city, for example "NYC" for New York City
- latitude: the approximate lattitude of the city or airport, for example 25.0343
- longitude: the approximate longitude of the city or airport, for example -77.3963
- country_name: the country name, for example "Bahamas"
- attraction_1: an attraction that matches either the user's message or the location, 
  for example "Atlantis Resort"
- attraction_2: a second attraction that matches either the user's message or the location, 
  for example "Cabbage Beach"
- attraction_3: a third attraction that matches either the user's message or the location, 
  for example "Blue Lagoon Island"

If the user specifically requests multiple or diverse options (e.g., “a tropical place”), 
provide up to three interesting, well-known, or relatively distinct locations rather than 
three airports near each other. If the user specifically asks for one city or there’s only 
one obvious choice (like "Venice"), return just a dictionary of 3 same answers. 
Return only well-known airports that support American Airlines flights.

Your response MUST be valid JSON in the form:
{
  "destinations": [
    {
      "city_name": "<CITY>",
      "country_name": "<COUNTRY>",
      "airport_code": "<CODE>",
      "city_code": <CITY_CODE>,
      "latitude": <LATITUDE>,
      "longitude": <LONGITUDE>,
      "attraction_1": "<ATTRACTION>",
      "attraction_2": "<ATTRACTION>",
      "attraction_3": "<ATTRACTION>"
    },
    ...
  ]
}

If uncertain or you cannot find a good match, return an empty array for "destinations".
Do not include additional keys, text, or explanation outside of this JSON.
"""



def parse_destination(user_text: str) -> dict:
    """
    Sends the user_text to the LLM and returns a dictionary with a 'destinations' key.
    'destinations' is a list of up to three items, each having 'city_name' and 'airport_code'.
    
    Example return:
    {
      "destinations": [
        {"city_name": "Cancun", "airport_code": "CUN"},
        {"city_name": "Honolulu", "airport_code": "HNL"},
        ...
      ]
    }
    """
    # Build the messages for Chat
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_text},
    ]

    response = openai.chat.completions.create(
        model="gpt-4",  # or gpt-4, if available
        messages=messages,
        temperature=0.0  # keep it deterministic for testing
    )

    raw_reply = response.choices[0].message.content.strip()

    # Attempt to parse JSON. If it fails, provide a fallback structure.
    try:
        data = json.loads(raw_reply)
    except json.JSONDecodeError:
        data = {"destinations": []}

    # Enforce the structure we expect
    if not isinstance(data, dict) or "destinations" not in data:
        data = {"destinations": []}
    if not isinstance(data["destinations"], list):
        data["destinations"] = []

    return data

if __name__ == "__main__":
    # Quick test of the AI worker:
    test_inputs = [
        "i want to go to a tropical place"
    ]
    for inp in test_inputs:
        print(f"\nUser Input: {inp}")
        result = parse_destination(inp)
        print("Parsed Destinations:", result)
