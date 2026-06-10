import os
from dotenv import load_dotenv
from groq import Groq
from transcript import get_transcript

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize(url):
    text = get_transcript(url)
    
    prompt = f"""
You are an elite AI study coach. Analyze this YouTube video transcript and produce a comprehensive study package:

SUMMARY
Write a clear, engaging summary in 200-250 words. Use simple language. Make it feel like a smart friend explaining it.

KEY CONCEPTS
List the 5-10 most important concepts from the video. One line each.

PLAN OF ACTION
What should the student DO after watching this? Concrete, specific steps only.

QUIZ QUESTIONS
Generate 5 multiple choice questions to test understanding. Format:
Q1. question
a) option
b) option
c) option
d) option
Answer: x

FLASHCARDS
Generate 5 flashcards. Format:
Front: concept
Back: definition/explanation

MIND MAP STRUCTURE
List the main topic, then subtopics, then sub-subtopics in a tree format.

Transcript:
{text}
"""
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

url = input("Paste YouTube URL: ")
print(summarize(url))