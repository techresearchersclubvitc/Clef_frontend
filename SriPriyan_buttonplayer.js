const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const MODES = {
    PLUS: 'plus',
    MINUS: 'minus'
};

const AUDIO_MAPPING = {
    'C_plus': 'middle-c-piano-c4-422087.mp3',
    'C_minus': 'high-c-piano-c5-422108.mp3',
    'C#_plus': 'cinematic-piano-note-362716.mp3',
    'C#_minus': 'ambient-piano-logo-165357.mp3',
    'D_plus': 'd-piano-d4-422090.mp3',
    'D_minus': 'dance-piano-418630.mp3',
    'D#_plus': 'angelical-pad-143276.mp3',
    'D#_minus': 'just-relax-11157.mp3',
    'E_plus': 'piano-chords-239967.mp3',
    'E_minus': 'piece-of-piano-245702.mp3',
    'F_plus': 'f-piano-f4-422093.mp3',
    'F_minus': 'soft-piano-100-bpm-121529.mp3',
    'F#_plus': 'piano-logo-152947.mp3',
    'F#_minus': 'piano-logo-reveal-201060.mp3',
    'G_plus': 'g-piano-g4-422102.mp3',
    'G_minus': 'piano-g-6200.mp3',
    'G#_plus': 'guitar-slow-emotion-330121.mp3',
    'G#_minus': 'instrumental-acoustic-guitar-music-413281.mp3',
    'A_plus': 'a-piano-a4-422104.mp3',
    'A_minus': 'sad-piano-love-story-71443.mp3',
    'A#_plus': 'nostalgia-a-sweet-amp-memorable-loopable-piano-song-by-gtg-319605.mp3',
    'A#_minus': 'relax-guitar-397787.mp3',
    'B_plus': 'my-life-main-6670.mp3',
    'B_minus': 'solo-guitar-mazurka-choro-419752.mp3'
};

const AUDIO_CONFIG = {
    basePath: './audio/',
    getFileName: (note, mode) => AUDIO_MAPPING[`${note}_${mode}`]
};

const ANIMATION_DURATION = 300;

const state = {
    currentMode: MODES.PLUS,
    lastPlayedNote: null,
    audioCache: new Map()
};

let domElements = {
    notesContainer: null,
    modePlusBtn: null,
    modeMinusBtn: null,
    modeStatus: null,
    noteStatus: null,
    audioContainer: null
};

function createAudioElement(note, mode) {
    const cacheKey = `${note}_${mode}`;
    
    if (state.audioCache.has(cacheKey)) {
        return state.audioCache.get(cacheKey);
    }
    
    const audio = new Audio();
    const fileName = AUDIO_CONFIG.getFileName(note, mode);
    audio.src = `${AUDIO_CONFIG.basePath}${fileName}`;
    audio.preload = 'auto';
    
    state.audioCache.set(cacheKey, audio);
    
    audio.addEventListener('error', () => {
        console.warn(`Audio file not found: ${audio.src}`);
    });
    
    return audio;
}

function playNote(note) {
    const audio = createAudioElement(note, state.currentMode);
    audio.currentTime = 0;
    
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
    
    state.lastPlayedNote = note;
    updateNoteVisuals(note);
    updateNoteStatus(note);
}

function updateNoteVisuals(note) {
    const noteButtons = domElements.notesContainer.querySelectorAll('.note-btn');
    noteButtons.forEach(btn => btn.classList.remove('last-played'));
    
    const currentButton = Array.from(noteButtons).find(btn => btn.dataset.note === note);
    
    if (currentButton) {
        currentButton.classList.add('playing');
        setTimeout(() => {
            currentButton.classList.remove('playing');
            currentButton.classList.add('last-played');
        }, ANIMATION_DURATION);
    }
}

function updateNoteStatus(note) {
    const modeText = state.currentMode === MODES.PLUS ? 'Plus' : 'Minus';
    domElements.noteStatus.textContent = `Playing note ${note} in ${modeText} mode`;
}

export function setMode(mode) {
    if (!Object.values(MODES).includes(mode)) {
        console.error(`Invalid mode: ${mode}`);
        return;
    }
    
    state.currentMode = mode;
    updateModeUI(mode);
    updateModeStatus(mode);
}

function updateModeUI(mode) {
    domElements.modePlusBtn.classList.remove('active');
    domElements.modeMinusBtn.classList.remove('active');
    domElements.modePlusBtn.setAttribute('aria-pressed', 'false');
    domElements.modeMinusBtn.setAttribute('aria-pressed', 'false');
    
    if (mode === MODES.PLUS) {
        domElements.modePlusBtn.classList.add('active');
        domElements.modePlusBtn.setAttribute('aria-pressed', 'true');
    } else {
        domElements.modeMinusBtn.classList.add('active');
        domElements.modeMinusBtn.setAttribute('aria-pressed', 'true');
    }
}

function updateModeStatus(mode) {
    const modeText = mode === MODES.PLUS ? 'Plus' : 'Minus';
    domElements.modeStatus.textContent = `Current mode: ${modeText}`;
}

function renderNoteButtons() {
    domElements.notesContainer.innerHTML = '';
    
    NOTES.forEach(note => {
        const button = createNoteButton(note);
        domElements.notesContainer.appendChild(button);
    });
}

function createNoteButton(note) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'note-btn';
    button.dataset.note = note;
    button.setAttribute('aria-label', `Play note ${note}`);
    button.setAttribute('title', `Play ${note}`);
    
    if (note.includes('#')) {
        const [baseNote, sharp] = note.split('#');
        button.innerHTML = `${baseNote}<span class="sharp-symbol">#</span>`;
    } else {
        button.textContent = note;
    }
    
    button.addEventListener('click', () => handleNoteClick(note));
    button.addEventListener('keydown', (e) => handleNoteKeydown(e, note));
    
    return button;
}

/* ========================================
   Event Handlers
   ======================================== */

function handleNoteClick(note) {
    playNote(note);
}

function handleNoteKeydown(event, note) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        playNote(note);
    }
}

function handleModeClick(event) {
    const mode = event.currentTarget.dataset.mode;
    setMode(mode);
}

function handleModeKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const mode = event.currentTarget.dataset.mode;
        setMode(mode);
    }
}

function setupModeListeners() {
    domElements.modePlusBtn.addEventListener('click', handleModeClick);
    domElements.modePlusBtn.addEventListener('keydown', handleModeKeydown);
    domElements.modeMinusBtn.addEventListener('click', handleModeClick);
    domElements.modeMinusBtn.addEventListener('keydown', handleModeKeydown);
}

function cacheDOMElements() {
    domElements.notesContainer = document.getElementById('notes-container');
    domElements.modePlusBtn = document.getElementById('mode-plus');
    domElements.modeMinusBtn = document.getElementById('mode-minus');
    domElements.modeStatus = document.getElementById('mode-status');
    domElements.noteStatus = document.getElementById('note-status');
    domElements.audioContainer = document.getElementById('audio-container');
}

function init() {
    cacheDOMElements();
    
    if (!domElements.notesContainer || !domElements.modePlusBtn || !domElements.modeMinusBtn) {
        console.error('Required DOM elements not found.');
        return;
    }
    
    renderNoteButtons();
    setupModeListeners();
    setMode(MODES.PLUS);
    
    console.log('Button Audio Player initialized');
}

export { playNote, NOTES, MODES, state };

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
