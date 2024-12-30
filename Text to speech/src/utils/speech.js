import { generateAudio } from './voiceRSS.js';

export class SpeechManager {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();
    this.voices = [
      { name: "Arabic Male", lang: "ar-sa", voice: "Zeina" },
      { name: "Arabic Female", lang: "ar-eg", voice: "Leila" },
      { name: "Chinese Male", lang: "zh-cn", voice: "Chang" },
      { name: "Chinese Female", lang: "zh-hk", voice: "Lulu" },
      { name: "Danish Male", lang: "da-dk", voice: "Rasmus" },
      { name: "Dutch Male", lang: "nl-nl", voice: "Maxim" },
      { name: "English Male", lang: "en-us", voice: "John" },
      { name: "English Female", lang: "en-gb", voice: "Emma" },
      { name: "French Male", lang: "fr-fr", voice: "Remy" },
      { name: "German Male", lang: "de-de", voice: "Stefan" },
      { name: "Greek Male", lang: "el-gr", voice: "Nikos" },
      { name: "Hindi FeMale", lang: "hi-in", voice: "Aditi" },
      { name: "Italian Male", lang: "it-it", voice: "Carlo" },
      { name: "Japanese Male", lang: "ja-jp", voice: "Ichiro" },
      { name: "Korean Male", lang: "ko-kr", voice: "Jun" },
      { name: "Polish Male", lang: "pl-pl", voice: "Marcin" },
      { name: "Portuguese Male", lang: "pt-br", voice: "Felipe" },
      { name: "Russian Male", lang: "ru-ru", voice: "Dmitry" },
      { name: "Spanish Male", lang: "es-es", voice: "Enrique" },
      { name: "Turkish Male", lang: "tr-tr", voice: "Emir" },
    ];
    this.speech.rate = 1;
    this.speech.pitch = 1;
    this.speech.volume = 1;
    this.isPlaying = false;
    this.currentVoice = this.voices[0];
    this.audio = new Audio(); // For playing generated audio
  }

  initVoices() {
    return Promise.resolve(this.voices);
  }

  setVoice(index) {
    this.currentVoice = this.voices[index];
  }

  setText(text) {
    this.speech.text = text;
  }

  // setRate(rate) {
  //   this.speech.rate = rate;
  // }

  // setPitch(pitch) {
  //   this.speech.pitch = pitch;
  // }

  async toggleSpeech(onStart, onEnd) {
    if (this.isPlaying) {
      this.stop();
      this.isPlaying = false;
      onEnd();
    } else {
      this.isPlaying = true;
      onStart();

      try {
        const audioBlob = await generateAudio(this.speech.text, this.currentVoice, this.speech.rate);
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audio.src = audioUrl;
        this.audio.play();

        this.audio.onended = () => {
          this.isPlaying = false;
          onEnd();
          URL.revokeObjectURL(audioUrl);
        };
      } catch (error) {
        console.error('Error generating audio:', error);
        this.isPlaying = false;
        onEnd();
      }
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  async exportToAudio() {
    const text = this.speech.text;
    if (!text) {
      throw new Error('No text to convert');
    }

    return generateAudio(text, this.currentVoice, this.speech.rate);
  }
}
