/**
 * Web Audio API sound effects for the "Ancient Quantum" theme.
 * Zero dependencies — uses OscillatorNode for synthetic sci-fi sounds.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  // Resume if suspended (browsers require user gesture to start audio)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  gain: number,
  type: OscillatorType = "sine",
  freqEnd?: number,
) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (freqEnd !== undefined) {
      osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + duration);
    }

    // Gain envelope: quick attack, smooth decay
    vol.gain.setValueAtTime(0, ctx.currentTime);
    vol.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.005);
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(vol);
    vol.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silently fail if Web Audio API unavailable
  }
}

/** Short high-pitched blip for each [SYS] terminal line */
export function playTerminalBeep() {
  playTone(800, 0.06, 0.08, "square");
}

/** Confirmation tone for Yes click — ascending sweep */
export function playCardConfirm() {
  playTone(600, 0.12, 0.12, "sine", 900);
}

/** Low buzz for No click */
export function playCardDeny() {
  playTone(200, 0.1, 0.1, "sawtooth");
}

/** Mid chirp for Unsure click */
export function playCardUnsure() {
  playTone(500, 0.08, 0.1, "triangle");
}

/** Triumphant ascending chord for unlock phase */
export function playUnlockSuccess() {
  try {
    const ctx = getAudioContext();
    const freqs = [330, 415, 523, 660]; // E4, G#4, C5, E5
    const stagger = 0.07;

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const vol = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * stagger);

      const start = ctx.currentTime + i * stagger;
      vol.gain.setValueAtTime(0, start);
      vol.gain.linearRampToValueAtTime(0.1, start + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

      osc.connect(vol);
      vol.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.3);
    });
  } catch {
    // Silently fail
  }
}
