export class Timer {
  constructor(onTick, onComplete) {
    this.duration = 0;
    this.timeLeft = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.interval = null;
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  start(hours, minutes, seconds) {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (this.isPaused) {
      this.isPaused = false;
    } else {
      this.duration = totalSeconds;
      this.timeLeft = totalSeconds;
    }
    this.isRunning = true;
    
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.onTick(this.timeLeft, this.duration);
      
      if (this.timeLeft <= 0) {
        this.stop();
        this.onComplete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    this.isPaused = true;
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.isPaused = false;
    this.timeLeft = 0;
    this.onTick(0, this.duration);
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    clearInterval(this.interval);
  }
}