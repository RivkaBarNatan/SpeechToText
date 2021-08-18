from google.cloud import speech
from flask import Flask, request
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)


@app.route('/pors', methods=['GET'])
def prin():
    return 'hello'


@app.route('/', methods=['POST'])
def hello():

    file = request.files['file']
    file.save(file.filename)
    print(file.filename)
    print("abcdddefghijklmnnopqrstuvwxyz")
    with io.open(file.filename, "rb") as audio_file:
        content = audio_file.read()
    trans = transcribe_file(audio_file, content)
    return (trans)


def transcribe_file(audio_file, content):
    """Transcribe the given audio file."""

    client = speech.SpeechClient.from_service_account_json("Speech.json")

    

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        audio_channel_count=2,
        # sample_rate_hertz=16000,
        language_code="iw-IL",
    )

    response = client.recognize(config=config, audio=audio)

    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        return (format(result.alternatives[0].transcript))


app.run(port=5000)
