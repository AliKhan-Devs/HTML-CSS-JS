import { Timer } from './timer.js';
import { formatTime } from './formatTime.js';
import { audioPlayer } from './audio.js';

class TimerUI {
  constructor() {
    this.timeDisplay = document.querySelector('.time');
    this.startButton = document.querySelector('.start');
    this.resetButton = document.querySelector('.reset');
    this.circle = document.querySelector('.circle');
    
    this.hoursInput = document.querySelector('.hours-input');
    this.minutesInput = document.querySelector('.minutes-input');
    this.secondsInput = document.querySelector('.seconds-input');
    
    this.timer = new Timer(
      (timeLeft, duration) => this.updateDisplay(timeLeft, duration),
      () => this.handleComplete()
    );

    this.setupEventListeners();
    this.updateCircle(100); // Start with full circle
  }

  setupEventListeners() {
    this.startButton.addEventListener('click', () => this.toggleTimer());
    this.resetButton.addEventListener('click', () => this.handleReset());
    
    [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => {
      input.addEventListener('input', () => {
        const value = parseInt(input.value) || 0;
        input.value = Math.max(0, Math.min(value, parseInt(input.max)));
      });
    });
  }

  toggleTimer() {
    if (this.timer.isRunning) {
      this.timer.pause();
      this.startButton.textContent = this.timer.isPaused ? 'Resume' : 'Start';
    } else {
      const hours = parseInt(this.hoursInput.value) || 0;
      const minutes = parseInt(this.minutesInput.value) || 0;
      const seconds = parseInt(this.secondsInput.value) || 0;
      
      if (hours + minutes + seconds > 0) {
        this.timer.start(hours, minutes, seconds);
        this.startButton.textContent = 'Pause';
        this.resetButton.disabled = false;
        this.disableInputs(true);
      }
    }
  }

  updateDisplay(timeLeft, duration) {
    this.timeDisplay.textContent = formatTime(timeLeft);
    const progress = (timeLeft / duration) * 100;
    this.updateCircle(progress);
  }

  updateCircle(percentage) {
    this.circle.style.setProperty('--progress', `${percentage}%`);
  }

  handleComplete() {
    this.startButton.textContent = 'Start';
    this.resetButton.disabled = true;
    this.disableInputs(false);
    this.updateCircle(0);
    audioPlayer.playTimerComplete();
  }

  handleReset() {
    this.timer.reset();
    this.startButton.textContent = 'Start';
    this.resetButton.disabled = true;
    this.disableInputs(false);
    this.updateCircle(100);
    this.timeDisplay.textContent = '00:00:00';
    
    // Reset all inputs to zero
    this.hoursInput.value = '';
    this.minutesInput.value = '';
    this.secondsInput.value = '';
  }

  disableInputs(disabled) {
    this.hoursInput.disabled = disabled;
    this.minutesInput.disabled = disabled;
    this.secondsInput.disabled = disabled;
  }
}

new TimerUI();