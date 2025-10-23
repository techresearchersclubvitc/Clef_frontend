# Audio Files Directory

## Required Audio Files

This directory should contain the audio files for all musical notes in both Plus (+) and Minus (−) modes.

### File Naming Convention

Files should be named following this pattern:
```
<note>_<mode>.mp3
```

### Required Files List

**Plus Mode (24 files):**
- `C_plus.mp3`
- `Csharp_plus.mp3`
- `D_plus.mp3`
- `Dsharp_plus.mp3`
- `E_plus.mp3`
- `F_plus.mp3`
- `Fsharp_plus.mp3`
- `G_plus.mp3`
- `Gsharp_plus.mp3`
- `A_plus.mp3`
- `Asharp_plus.mp3`
- `B_plus.mp3`

**Minus Mode (12 files):**
- `C_minus.mp3`
- `Csharp_minus.mp3`
- `D_minus.mp3`
- `Dsharp_minus.mp3`
- `E_minus.mp3`
- `F_minus.mp3`
- `Fsharp_minus.mp3`
- `G_minus.mp3`
- `Gsharp_minus.mp3`
- `A_minus.mp3`
- `Asharp_minus.mp3`
- `B_minus.mp3`

### Total Files Required
24 audio files (12 notes × 2 modes)

### Supported Audio Formats
- Primary: `.mp3`
- Alternative formats can be used by modifying the `AUDIO_CONFIG.extension` in `SriPriyan_buttonplayer.js`

### Audio File Specifications (Recommended)
- **Sample Rate:** 44.1 kHz
- **Bit Rate:** 128-320 kbps
- **Duration:** 1-3 seconds per note
- **Format:** MP3 (for broad browser compatibility)

### Where to Get Audio Files

1. **Generate Programmatically:** Use tools like ToneJS or Web Audio API
2. **Record Instruments:** Record actual instruments playing each note
3. **Use Sample Libraries:** Download from royalty-free music sample sites
4. **Synthesize:** Use digital audio workstations (DAWs) like GarageBand, FL Studio, or Audacity

### Example: Generating Audio with Python

You can use the `pydub` and `numpy` libraries to generate simple sine wave tones:

```python
from pydub.generators import Sine
from pydub import AudioSegment

# Frequencies for each note (in Hz) - Middle C octave
notes = {
    'C': 261.63,
    'Csharp': 277.18,
    'D': 293.66,
    'Dsharp': 311.13,
    'E': 329.63,
    'F': 349.23,
    'Fsharp': 369.99,
    'G': 392.00,
    'Gsharp': 415.30,
    'A': 440.00,
    'Asharp': 466.16,
    'B': 493.88
}

modes = ['plus', 'minus']

for note, freq in notes.items():
    for mode in modes:
        # Adjust frequency based on mode
        if mode == 'plus':
            tone_freq = freq * 2  # One octave higher
        else:
            tone_freq = freq / 2  # One octave lower
        
        # Generate 2-second tone
        tone = Sine(tone_freq).to_audio_segment(duration=2000)
        
        # Export as MP3
        filename = f"{note}_{mode}.mp3"
        tone.export(filename, format="mp3")
        print(f"Generated: {filename}")
```

### Testing Without Audio Files

The component will still function without audio files, but will log warnings to the console. This allows you to test the UI and interactions before adding actual audio.

---

**Note:** Place all audio files directly in this `audio` directory. The JavaScript expects files to be at `./audio/<filename>.mp3`.
