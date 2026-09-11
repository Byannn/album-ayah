/**
 * Ambient nostalgic Web Audio synthesizer for Ayah's memory album.
 * Generates a warm, gentle, tape-softened music box / piano melody in pentatonic warmth.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private vinylNode: AudioBufferSourceNode | null = null;

  // Tender nostalgic chord sequence (Frequencies in Hz)
  // C major / G / Am / F warm nostalgic progression
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    [174.61, 261.63, 329.63, 392.00], // Fmaj7 (F3, C4, E4, G4)
    [196.00, 246.94, 293.66, 392.00], // Gsus4 / Gadd9
    [261.63, 329.63, 392.00, 523.25], // C add9
  ];

  private melodyNotes = [
    523.25, 587.33, 659.25, 783.99, 659.25, 523.25, 392.00, 440.00,
    523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 523.25, 587.33
  ];

  private currentStep = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      const master = this.ctx.createGain();
      master.gain.value = 0.35;
      master.connect(this.ctx.destination);
      this.masterGain = master;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft bell/piano tone
  private playTone(freq: number, time: number, duration: number, volume = 0.25) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm filter (warm acoustic sound)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(350, time + duration);

    // Warm sine + subtle triangle for harmonic warmth
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 0.5, time); // warm octave below sub-tone

    // Envelope
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Subtle warm tape/vinyl crackle
  private startVinylNoise() {
    if (!this.ctx || !this.masterGain || this.vinylNode) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-like filter
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        if (Math.random() < 0.0008) {
          output[i] += (Math.random() - 0.5) * 0.4; // subtle vinyl click
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 900;
      noiseFilter.Q.value = 1.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.035;

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start();
      this.vinylNode = whiteNoise;
    } catch {
      // Ignored if not supported
    }
  }

  private tick = () => {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const chordIndex = Math.floor(this.currentStep / 4) % this.chords.length;
    const chord = this.chords[chordIndex];

    // Play base chord on quarter note
    if (this.currentStep % 4 === 0) {
      chord.forEach((freq, idx) => {
        this.playTone(freq, now + idx * 0.03, 3.2, 0.12);
      });
    }

    // Play delicate melody note
    const melodyIndex = this.currentStep % this.melodyNotes.length;
    const melodyFreq = this.melodyNotes[melodyIndex];
    if (Math.random() > 0.15) {
      this.playTone(melodyFreq, now, 1.8, 0.18);
    }

    this.currentStep++;
  };

  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startVinylNoise();

    // Trigger immediately
    this.tick();
    // Loop every 800ms (slow, nostalgic tempo ~75 bpm)
    this.intervalId = window.setInterval(this.tick, 800);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.vinylNode) {
      try {
        this.vinylNode.stop();
        this.vinylNode.disconnect();
      } catch {
        // Safe catch
      }
      this.vinylNode = null;
    }
  }

  /** Musik latar memudar lalu berhenti, dipakai saat lagu penutup mulai. */
  public fadeOutAndStop(duration = 1.2) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + duration);

    // Tidak ada nada baru yang dijadwalkan lagi sejak detik ini
    this.isPlaying = false;
    window.setTimeout(() => this.stop(), duration * 1000 + 200);
  }

  public toggleMute(): boolean {
    this.initContext();
    if (!this.masterGain) return false;

    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.masterGain.gain.linearRampToValueAtTime(0, (this.ctx?.currentTime || 0) + 0.2);
    } else {
      if (!this.isPlaying) {
        this.start();
      }
      this.masterGain.gain.linearRampToValueAtTime(0.35, (this.ctx?.currentTime || 0) + 0.3);
    }
    return this.isMuted;
  }

  public playChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      this.playTone(freq, now + i * 0.1, 2.5, 0.2);
    });
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
