import json
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT_EXPERIENCES = """
You are a travel assistant helping users find the best experiences for their vacation.

The user will describe the type of vacation they want (e.g. "I want a relaxing beach vacation with snorkeling").

If there are no adequate activities matching the user's description, you can create one as a recommendation. but looking professional still, like this format:

# No real data from the API - fallback to curated ski experiences
    experiences = [
        {
            "name": "Niseko United Ski Resort",
            "description": "One of Japan's most famous ski resorts with fantastic powder snow.",
            "price": "Varies by pass/package",
            "currency": "JPY",
            "latitude": 42.8048,
            "longitude": 140.6874,
            "url": "https://www.nisekounited.com/book-now/"
        },

You will receive a JSON list of experiences, each with:
- name
- description
- price
- currency
- latitude
- longitude
- url

Your task:
1. Figure out which experiences best match the user's vacation description.
2. The returned experiences do not have to all perfectly match, just 1 matching suffices.
3. Return 4 experiences, sorted by relevance.
4. If there are no matching experiences, pick any 3 experiences to recommend, make sure they are formatted perfectly.
5. Respond **only** with valid JSON in the following format (no extra text!):

{
  "matched_experiences": [
    {
      "name": "<NAME>",
      "description": "<DESCRIPTION>",
      "price": "<PRICE>",
      "currency": "<CURRENCY>",
      "latitude": <LATITUDE>,
      "longitude": <LONGITUDE>,
      "url": "<URL>"
    }
  ]
}
"""

def truncate_messages(messages, max_tokens=8000):
    """
    Truncate the messages list to fit within the max_tokens limit.
    """
    total_tokens = 0
    truncated_messages = []

    for message in messages:
        # Approximate token count for the message
        token_count = len(message["content"].split())
        if total_tokens + token_count > max_tokens:
            break
        truncated_messages.append(message)
        total_tokens += token_count

    return truncated_messages

def match_experiences_to_description(user_description: str, experiences: list) -> dict:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT_EXPERIENCES},
        {
            "role": "user",
            "content": f"Vacation description: {user_description}\n\nExperiences:\n{json.dumps(experiences)}"
        }
    ]

    # Truncate if necessary (optional)
    messages = truncate_messages(messages)

    # Make the GPT-4 call using chat.completions.create
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=0.0  # deterministic
    )

    raw_reply = response.choices[0].message.content.strip()

    # Parse the JSON. If invalid, fallback to empty array.
    try:
        data = json.loads(raw_reply)
    except json.JSONDecodeError:
        data = {"matched_experiences": []}

    # Validate structure
    if not isinstance(data, dict) or "matched_experiences" not in data:
        data = {"matched_experiences": []}
    if not isinstance(data["matched_experiences"], list):
        data["matched_experiences"] = []

    return data

# Example usage:
if __name__ == "__main__":
    user_input = "I want a relaxing beach vacation with snorkeling"
    example_experiences = [
        {
            "name": "Sunset cruise in Bora Bora, French Polynesia",
            "description": "Come and admire the magnificent sunset ...",
            "price": "420.0",
            "currency": "EUR",
            "latitude": -16.489931,
            "longitude": -151.714166,
            "url": "https://..."
        },
        {
            "name": "Boat tour and snorkeling half-day on the lagoon of Bora Bora",
            "description": "Embark on a half-day trip in a traditional Polynesian canoe...",
            "price": "92.0",
            "currency": "EUR",
            "latitude": -16.489971,
            "longitude": -151.714161,
            "url": "https://..."
        },
        {
            "name": "Snorkeling in the lagoon of Bora Bora, French Polynesia",
            "description": "Dive into the heart of the lagoon...",
            "price": "105.0",
            "currency": "EUR",
            "latitude": -16.489544,
            "longitude": -151.714357,
            "url": "https://..."
        },
        # Add more if you want
    ]

    results = match_experiences_to_description(user_input, example_experiences)
    print("\nFINAL FILTERED RESULTS:\n", json.dumps(results, indent=2))
