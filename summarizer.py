import os
import json
from dotenv import load_dotenv
from groq import Groq
from transcript import get_transcript

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize(url):
    text = get_transcript(url)

    prompt = f"""
You are an elite AI study coach. Analyze this YouTube video transcript and produce a comprehensive study package.

Respond ONLY with valid JSON in exactly this structure, no extra text:

{{
  "summary": "200-250 word clear, engaging summary in simple language",
  "key_concepts": ["concept 1", "concept 2", "..."],
  "action_items": ["action 1", "action 2", "..."],
  "quiz": [
    {{
      "question": "...",
      "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
      "answer": "b"
    }}
  ],
  "flashcards": [
    {{"front": "concept", "back": "definition/explanation"}}
  ],
  "mind_map": {{
    "topic": "main topic",
    "subtopics": [
      {{"name": "subtopic 1", "children": ["sub-subtopic", "sub-subtopic"]}}
    ]
  }}
}}

Generate 5 quiz questions and 5 flashcards.

Transcript:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)

if __name__ == "__main__":
    url = input("Paste YouTube URL: ")
    result = summarize(url)
    print(json.dumps(result, indent=2))