# faster-whisper on Windows — Installation & Usage Guide

`Tag: [HOWTO_WINDOWS_FASTER-WHISPER]`

A practical guide to installing and using `faster-whisper` locally with Python on Windows, including Git Bash and PowerShell, batch transcription, model caching, and common errors.

## 1. What is faster-whisper?

`faster-whisper` is a local implementation of OpenAI's Whisper speech-to-text (STT) model.

It can be used to:

- Transcribe MP3, WAV, M4A and other audio files
- Automatically detect the spoken language
- Produce timestamped transcripts
- Process multiple files
- Run completely locally after the model has been downloaded
- Use CPU or NVIDIA GPU acceleration

## 2. Recommended Windows setup

For a new installation, use:

- Windows 10/11
- Python 3.13
- A virtual environment
- `faster-whisper`
- 16 GB RAM or more recommended
- SSD storage
- NVIDIA GPU optional

Python 3.14 may work with recent packages, but Python 3.13 is currently the safer choice for a stable setup.

## 3. Python and faster-whisper Setup

The following table covers the initial Windows setup. Choose the command column corresponding to the terminal you are using.

| Action                                  | Git Bash                                                                          | PowerShell                             | Command Prompt (CMD)                             | Expected result                                                           |
| --------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| **Check installed Python versions**     | `py -0p`                                                                          | Same                                   | Same                                             | Lists installed Python versions and their paths                           |
| **Check Python 3.13**                   | `py -3.13 --version`                                                              | Same                                   | Same                                             | `Python 3.13.x`                                                           |
| **Create virtual environment**          | `py -3.13 -m venv ~/whisper-env`                                                  | `py -3.13 -m venv "$HOME\whisper-env"` | `py -3.13 -m venv "%USERPROFILE%\whisper-env"`   | Creates `whisper-env`                                                     |
| **Activate environment**                | `source ~/whisper-env/Scripts/activate`                                           | `.\whisper-env\Scripts\Activate.ps1`   | `%USERPROFILE%\whisper-env\Scripts\activate.bat` | Terminal prompt shows `(whisper-env)`                                     |
| **Check active Python**                 | `which python`                                                                    | `where.exe python`                     | `where python`                                   | Path should point to `whisper-env\Scripts\python`                         |
| **Check Python version**                | `python --version`                                                                | Same                                   | Same                                             | `Python 3.13.x`                                                           |
| **Check active pip**                    | `which pip`                                                                       | `where.exe pip`                        | `where pip`                                      | Path should point to `whisper-env\Scripts\pip`                            |
| **Upgrade pip/tools**                   | `python -m pip install --upgrade pip setuptools wheel`                            | Same                                   | Same                                             | Packages upgrade successfully                                             |
| **Install faster-whisper**              | `python -m pip install faster-whisper`                                            | Same                                   | Same                                             | `faster-whisper` installed                                                |
| **Install Windows certificate support** | `python -m pip install pip-system-certs`                                          | Same                                   | Same                                             | Certificate integration installed                                         |
| **Test installation**                   | `python -c "from faster_whisper import WhisperModel; print('faster-whisper OK')"` | Same                                   | Same                                             | `faster-whisper OK`                                                       |
| **Deactivate**                          | `deactivate`                                                                      | Same                                   | Same                                             | Deactive faster-whisper environment after the script was run successfully |

### Important: verify the environment

Before running `transcribe.py`, make sure the virtual environment is actually active.

For Git Bash:

```bash
which python
python --version
```

You want something similar to:

```text
/c/Users/<username>/whisper-env/Scripts/python
Python 3.13.x
```

If you instead see something like:

```text
/c/Users/<username>/AppData/Local/Microsoft/WindowsApps/python
Python 3.14.5
```

you are using the system Python rather than the virtual environment.

Activate it again:

```bash
source ~/whisper-env/Scripts/activate
```

### Remember

The virtual environment only needs to be **created once**.

After closing and reopening a terminal, you need to **activate it again**, but you do not need to reinstall anything.

### Git Bash

```bash
source ~/whisper-env/Scripts/activate
```

### PowerShell

```powershell
.\whisper-env\Scripts\Activate.ps1
```

### CMD

```cmd
%USERPROFILE%\whisper-env\Scripts\activate.bat
```

Once activated, run:

```bash
python transcribe.py # or whatever the python script is called
```

The `large-v3` model is downloaded separately on its first successful run and is subsequently reused from the local Hugging Face cache.

## 4. The first run downloads the model

When you use:

```python
WhisperModel("large-v3")
```

`faster-whisper` downloads the model from Hugging Face the first time. The model is then stored in the local Hugging Face cache. Subsequent executions do **not** normally download the entire model again.

The process is:

```plaintext
First run
    ↓
Download large-v3
    ↓
Store in local cache
    ↓
Transcribe

Later runs
    ↓
Find large-v3 in cache
    ↓
Use local model
    ↓
Transcribe
```

# 5. Process multiple MP3 files

If the Python script is in the same directory as your MP3 files:

```plaintext
chinese_podcast/
├── transcribe.py
├── episode01.mp3
├── episode02.mp3
├── episode03.mp3
└── episode04.mp3
```

Simple script sample:

```python
from faster_whisper import WhisperModel
from pathlib import Path

# Folder containing this script and the MP3 files
podcast_folder = Path(__file__).parent

# Load model ONCE
print("Loading Whisper model...")
model = WhisperModel(
    "large-v3",
    device="cpu",
    compute_type="int8"
)

# Find MP3 files
audio_files = sorted(podcast_folder.glob("*.mp3"))

print(f"Found {len(audio_files)} MP3 file(s).")

for audio_file in audio_files:

    output_file = audio_file.with_suffix(".txt")

    # Don't transcribe files that already have a transcript
    if output_file.exists():
        print(f"Skipping: {audio_file.name} (transcript already exists)")
        continue

    print(f"\nTranscribing: {audio_file.name}")

    try:
        segments, info = model.transcribe(
            str(audio_file),
            language=None,
            vad_filter=True
        )

        print(f"Detected language: {info.language}")

        with open(output_file, "w", encoding="utf-8") as f:

            f.write(f"Detected language: {info.language}\n\n")

            for segment in segments:
                text = segment.text.strip()

                line = (
                    f"[{segment.start:.2f}s -> "
                    f"{segment.end:.2f}s] {text}\n"
                )

                print(line, end="")
                f.write(line)

        print(f"\nSaved: {output_file.name}")

    except Exception as e:
        print(f"\nERROR processing {audio_file.name}:")
        print(e)

print("\nFinished.")

```

## Tips

### Why use `Path(__file__).parent`?

This:

```python
podcast_folder = Path(__file__).parent
```

means:

> Use the directory containing the Python script.

It is more reliable than:

```python
Path(".")
```

because `Path(".")` means the directory from which Python was launched.

For example, even if you run:

```bash
python ~/Downloads/podcast/transcribe.py
```

`Path(__file__).parent` still points to:

```plaintext
~/Downloads/podcast/
```

### Language detection

For a podcast where you don't know the language beforehand, use:

```python
language=None
```

For example:

```python
segments, info = model.transcribe(
    "episode.mp3",
    language=None,
    vad_filter=True
)

print(info.language)
```

Whisper will attempt to detect the language.

However, there is an important limitation:

`info.language` represents the **detected/dominant language for the transcription**, not necessarily the language spoken in every individual segment.

### Multilingual podcasts

If the podcast contains multiple languages, for example:

```plaintext
English
French
Dutch
English
French
```

Whisper can recognize multilingual audio, but automatic language switching at the individual segment level is not guaranteed to be perfect.

For a serious multilingual workflow, consider adding a separate language-identification stage.

A more advanced pipeline would be:

```plaintext
Podcast
   ↓
Voice Activity Detection
   ↓
Speech segments
   ↓
Language identification
   ↓
Whisper transcription
   ↓
Speaker identification
   ↓
Translation
   ↓
TTS
```

### Speaker identification

Whisper itself does not reliably tell you:

```plaintext
Speaker 1
Speaker 2
Speaker 3
```

For podcast production, consider:

- WhisperX
- pyannote.audio

These can be combined with Whisper to produce results more like:

```plaintext
[00:01:14] Speaker 1 | EN
Welcome to today's podcast.

[00:01:18] Speaker 2 | FR
Merci de m'avoir invité.

[00:01:23] Speaker 1 | EN
It's great to have you here.
```

This is particularly useful if the eventual goal is to translate the podcast and generate different TTS voices for different speakers.

### CPU versus GPU

You can run faster-whisper without a GPU:

```python
model = WhisperModel(
    "large-v3",
    device="cpu"
)
```

This is slower but works.

With an NVIDIA GPU, you can use:

```python
model = WhisperModel(
    "large-v3",
    device="cuda",
    compute_type="float16"
)
```

For CPU processing, an appropriate quantized configuration can also be useful:

```python
model = WhisperModel(
    "large-v3",
    device="cpu",
    compute_type="int8"
)
```

Exact performance depends heavily on your CPU/GPU.

### Model sizes

Whisper provides several model sizes.

Typical choices:

```plaintext
tiny
base
small
medium
large-v3
```

For podcasts:

| Model    | Speed     | Accuracy  |
| -------- | --------- | --------- |
| tiny     | Very fast | Lower     |
| base     | Fast      | Moderate  |
| small    | Good      | Good      |
| medium   | Slower    | Very good |
| large-v3 | Slowest   | Excellent |

For high-quality podcast transcription, `large-v3` is a strong choice if your computer can handle it.

### Hugging Face authentication warning

You may see:

```plaintext
Warning: You are sending unauthenticated requests to the HF Hub.
```

This is **not an error**.

It means you are downloading without a Hugging Face authentication token.

For normal personal use and a one-time model download, you can generally ignore it.

A token may be useful if you perform many downloads and need higher rate limits.

### Windows symlink warning

You may also see:

```plaintext
huggingface_hub cache-system uses symlinks by default but your machine does not support them
```

Again, this is a **warning, not an error**.

The model can still be downloaded and used.

Hugging Face is warning that its cache may consume more disk space because Windows is not allowing the preferred symlink behavior.

### SSL certificate error

A particularly important error is:

```plaintext
httpx.ConnectError:
[SSL: CERTIFICATE_VERIFY_FAILED]
certificate verify failed:
Basic Constraints of CA cert not marked critical
```

This means Python cannot establish a trusted HTTPS connection to Hugging Face.

It is **not a Whisper transcription error**.

The failure occurs here:

```plaintext
faster-whisper
    ↓
Hugging Face
    ↓
HTTPS
    ↓
Certificate validation fails
```

### Fixing the SSL problem

First, make sure you are using the correct virtual environment.

Check:

```bash
which python
python --version
which pip
```

You want:

```plaintext
/c/Users/<username>/whisper-env/Scripts/python
Python 3.13.x
```

not:

```plaintext
/c/Users/<username>/AppData/Local/Microsoft/WindowsApps/python
Python 3.14.x
```

Then install:

```bash
pip install pip-system-certs
```

This allows Python applications to use the Windows/system certificate store.

After installing it:

1. Close the terminal.
2. Open a new terminal.
3. Activate the virtual environment.
4. Run the script again.

Git Bash:

```bash
source ~/whisper-env/Scripts/activate
```

PowerShell:

```powershell
.\whisper-env\Scripts\Activate.ps1
```

Then:

```bash
python transcribe.py
```

### Python 3.14 confusion

One of the easiest mistakes on Windows is having multiple Python installations.

For example:

```plaintext
System Python
    Python 3.14

Virtual environment
    Python 3.13
```

If the virtual environment isn't activated, this:

```bash
python transcribe.py
```

may silently use the system Python.

Always check:

```bash
which python
python --version
```

after opening a new terminal.

If necessary:

```bash
source ~/whisper-env/Scripts/activate
```

### Key points to remember

1. **Create the virtual environment once.**
2. **Activate it each time you open a new terminal.**
3. Always verify which Python is active with `which python`.
4. Prefer Python 3.13 for this setup.
5. `large-v3` is downloaded only on the first successful installation/use.
6. The model is cached locally afterward.
7. `language=None` allows automatic language detection.
8. `info.language` is not reliable as a per-segment language label for multilingual podcasts.
9. Whisper does not perform speaker identification by itself.
10. Whisper is speech-to-text, not text-to-speech.
11. SSL errors occur during model download, not during transcription.
12. An incomplete model download must be completed before offline transcription will work.
13. CPU operation is possible; an NVIDIA GPU can make transcription much faster.
14. For multiple MP3s, load the model once and process the files in a loop.
