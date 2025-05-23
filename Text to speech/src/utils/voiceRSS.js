const API_KEY = ''; //Voice rss api key



export async function generateAudio(text, voice, rate) {
  const lang = voice.lang.replace('_', '-'); // Convert voice lang to API format
  const voiceName = voice.voice; // Include voice name for VoiceRSS

  const response = await fetch(
    `https://api.voicerss.org/?key=${API_KEY}&hl=${lang}&v=${voiceName}&src=${encodeURIComponent(text)}&r=${rate}&c=MP3&f=16khz_16bit_stereo`,
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error('Failed to generate audio');
  }

  return await response.blob();
}
