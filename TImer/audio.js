const TIMER_COMPLETE_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

class AudioPlayer {
  constructor() {
    this.audio = new Audio(TIMER_COMPLETE_SOUND);
    this.audio.preload = 'auto';
  }

  playTimerComplete() {
    this.audio.currentTime = 0;
    this.audio.play().catch(error => {
      console.warn('Could not play audio:', error);
    });
  }
}

export const audioPlayer = new AudioPlayer();