from youtube_transcript_api import YouTubeTranscriptApi

def get_video_id(url):
    if "v=" in url:
        return url.split("v=")[1].split("&")[0]
    return url

def get_transcript(url):
    video_id = get_video_id(url)
    transcript = YouTubeTranscriptApi().fetch(video_id)
    full_text = " ".join([item.text for item in transcript])
    return full_text

if __name__ == "__main__":
    url = input("Paste YouTube URL: ")
    print(get_transcript(url))