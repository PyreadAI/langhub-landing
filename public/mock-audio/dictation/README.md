# Dictation Mock Audio

Put static dictation audio files here. The mock dictation player maps the
realistic `audio_file` field directly to this folder. The active demo looks for:

- `seg_0.mp3`
- `seg_1.mp3`

These files are loaded directly by the browser from `/mock-audio/dictation/`.
No backend request is made. If a file is missing, the demo keeps working with a
visual-only playback fallback.
