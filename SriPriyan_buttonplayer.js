// Chromatic Harmonica Notation
const NOTES = [
  '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10', '-11', '-12',
  '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', '+11', '+12'
];

const MODES = {
  BLOW: 'blow',
  DRAW: 'draw'
};

// Audio mapping based on chromatic harmonica notation
const AUDIO_MAPPING = {
  '-1': '-1.mp3',
  '-2': '-2.mp3',
  '-3': '-3.mp3',
  '-4': '-4.mp3',
  '-5': '-5.mp3',
  '-6': '-6.mp3',
  '-7': '-7.mp3',
  '-8': '-8.mp3',
  '-9': '-9.mp3',
  '-10': '-10.mp3',
  '-11': '-11.mp3',
  '-12': '-12.mp3',
  '+1': '+1.mp3',
  '+2': '+2.mp3',
  '+3': '+3.mp3',
  '+4': '+4.mp3',
  '+5': '+5.mp3',
  '+6': '+6.mp3',
  '+7': '+7.mp3',
  '+8': '+8.mp3',
  '+9': '+9.mp3',
  '+10': '+10.mp3',
  '+11': '+11.mp3',
  '+12': '+12.mp3'
};

const AUDIO_CONFIG = {
  basePath: './audio/',
  getFileName: (note) => AUDIO_MAPPING[note]
};

const ANIMATION_DURATION = 300;

const state = {
  lastPlayedNote: null,
  audioCache: new Map(),
  currentMode: MODES.BLOW // Start with blow/plus mode
};

const dom = {
  holesRow: null,
  holeOutput: null,
  modePlusBtn: null,
  modeMinusBtn: null,
  modeStatus: null,
  noteStatus: null
};

/** Audio Handling **/

function getAudioElement(note) {
  if (state.audioCache.has(note)) {
    return state.audioCache.get(note);
  }

  const fileName = AUDIO_CONFIG.getFileName(note);
  const audio = new Audio(`${AUDIO_CONFIG.basePath}${fileName}`);
  audio.preload = 'auto';

  audio.addEventListener('error', () => {
    console.warn(`Audio file not found: ${audio.src}`);
  });

  state.audioCache.set(note, audio);
  return audio;
}

function playNoteAudio(note) {
  const audio = getAudioElement(note);
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
  state.lastPlayedNote = note;
}

/** UI Updates **/

function updateHoleVisuals(holeNumber) {
  const holeButtons = dom.holesRow.querySelectorAll('.harmonica-hole');
  holeButtons.forEach(btn => btn.classList.remove('active', 'playing'));

  const currentBtn = holeButtons[holeNumber - 1];
  if (!currentBtn) return;

  currentBtn.classList.add('playing');
  setTimeout(() => {
    currentBtn.classList.replace('playing', 'active');
  }, ANIMATION_DURATION);
}

function updateHoleOutput(note) {
  dom.holeOutput.textContent = note;
}

function updateNoteStatusText(note) {
  const modeText = note.startsWith('+') ? 'Blow (+)' : 'Draw (-)';
  dom.noteStatus.textContent = `Playing note ${note} in ${modeText} mode`;
}

function updateModeUI(mode) {
  dom.modePlusBtn.classList.toggle('active', mode === MODES.BLOW);
  dom.modeMinusBtn.classList.toggle('active', mode === MODES.DRAW);

  dom.modePlusBtn.setAttribute('aria-pressed', mode === MODES.BLOW);
  dom.modeMinusBtn.setAttribute('aria-pressed', mode === MODES.DRAW);

  const modeText = mode === MODES.BLOW ? 'Blow (+)' : 'Draw (-)';
  dom.modeStatus.textContent = `Current mode: ${modeText}`;
}

/** Harmonica Hole Buttons **/

function createHarmonicaHole(holeNumber) {
  const btn = document.createElement('button');
  btn.className = 'harmonica-hole';
  btn.textContent = holeNumber;
  btn.title = `Hole ${holeNumber} - Left click: Blow (+), Middle click: Draw (-)`;
  btn.dataset.hole = holeNumber;

  // Handle mouse clicks
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default middle-click behavior
    handleHoleMouseClick(holeNumber, e.button);
  });

  // Handle keyboard
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleHoleClick(holeNumber, state.currentMode);
    }
  });

  // Prevent context menu on right-click (optional)
  btn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  return btn;
}

function renderHarmonicaHoles() {
  const holeCount = 12;
  dom.holesRow.innerHTML = '';

  for (let i = 1; i <= holeCount; i++) {
    const btn = createHarmonicaHole(i);
    dom.holesRow.appendChild(btn);
  }
}

/** Mode Handling **/

function setMode(mode) {
  if (!Object.values(MODES).includes(mode)) {
    console.error(`Invalid mode: ${mode}`);
    return;
  }
  state.currentMode = mode;
  updateModeUI(mode);
}

/** Event Handlers **/

function handleHoleMouseClick(holeNumber, mouseButton) {
  let note;
  
  // mouseButton: 0 = left, 1 = middle, 2 = right
  if (mouseButton === 0) {
    // Left click = Blow (+)
    note = `+${holeNumber}`;
  } else if (mouseButton === 1) {
    // Middle click = Draw (-)
    note = `-${holeNumber}`;
  } else {
    // Right click - do nothing or handle differently
    return;
  }
  
  playNoteAudio(note);
  updateHoleVisuals(holeNumber);
  updateHoleOutput(note);
  updateNoteStatusText(note);
}

function handleHoleClick(holeNumber, mode) {
  const prefix = mode === MODES.BLOW ? '+' : '-';
  const note = `${prefix}${holeNumber}`;
  
  playNoteAudio(note);
  updateHoleVisuals(holeNumber);
  updateHoleOutput(note);
  updateNoteStatusText(note);
}

function handleModeClick(event) {
  const mode = event.currentTarget.dataset.mode === 'plus' ? MODES.BLOW : MODES.DRAW;
  setMode(mode);
}

function handleModeKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    const mode = event.currentTarget.dataset.mode === 'plus' ? MODES.BLOW : MODES.DRAW;
    setMode(mode);
  }
}

/** Initialization **/

function cacheDOMElements() {
  dom.holesRow = document.getElementById('holesRow');
  dom.holeOutput = document.getElementById('holeOutput');
  dom.modePlusBtn = document.getElementById('mode-plus');
  dom.modeMinusBtn = document.getElementById('mode-minus');
  dom.modeStatus = document.getElementById('mode-status');
  dom.noteStatus = document.getElementById('note-status');
}

function setupEventListeners() {
  if (dom.modePlusBtn) {
    dom.modePlusBtn.addEventListener('click', handleModeClick);
    dom.modePlusBtn.addEventListener('keydown', handleModeKeydown);
  }
  
  if (dom.modeMinusBtn) {
    dom.modeMinusBtn.addEventListener('click', handleModeClick);
    dom.modeMinusBtn.addEventListener('keydown', handleModeKeydown);
  }
}

function init() {
  cacheDOMElements();

  if (!dom.holesRow || !dom.modePlusBtn || !dom.modeMinusBtn) {
    console.error('Required DOM elements not found.');
    return;
  }

  renderHarmonicaHoles();
  setupEventListeners();
  setMode(MODES.BLOW); // Initialize with blow mode
  
  console.log('Chromatic Harmonica Player initialized');
  console.log('Left click = Blow (+), Middle click = Draw (-)');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { playNoteAudio as playNote, NOTES, state, setMode };
