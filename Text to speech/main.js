import { SpeechManager } from './src/utils/speech.js';

const speechManager = new SpeechManager();

// DOM Elements
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
// const rateInput = document.getElementById('rate');
// const pitchInput = document.getElementById('pitch');
const playBtn = document.getElementById('play-btn');
const downloadBtn = document.getElementById('download-btn');
const waveElement = document.querySelector('.wave');

// Initialize voices
async function initializeVoices() {
  const voices = await speechManager.initVoices();
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

initializeVoices();

// Event Listeners
voiceSelect.addEventListener('change', (e) => {
  speechManager.setVoice(parseInt(e.target.value));
});

// rateInput.addEventListener('input', (e) => {
//   speechManager.setRate(parseFloat(e.target.value));
// });

// pitchInput.addEventListener('input', (e) => {
//   speechManager.setPitch(parseFloat(e.target.value));
// });

playBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) return;

  speechManager.setText(text);
  speechManager.toggleSpeech(
    () => {
      waveElement.classList.add('playing');
      playBtn.innerHTML = '<span class="material-symbols-outlined">pause</span>';
    },
    () => {
      waveElement.classList.remove('playing');
      playBtn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
    }
  );
});

downloadBtn.addEventListener('click', async () => {
  const text = textInput.value.trim();
  if (!text) {
    alert('Please enter some text first');
    return;
  }

  try {
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Converting...';

    speechManager.setText(text);
    const audioBlob = await speechManager.exportToAudio();

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting audio:', error);
    alert('Failed to generate audio. Please try again.');
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<span class="material-symbols-outlined">download</span> Download Audio';
  }
});
