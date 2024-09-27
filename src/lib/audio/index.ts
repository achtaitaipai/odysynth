import type { ParametersState } from "../parameters.js";
import { createGainEnvelope } from "./gainNode.js";
import { createHighPassFilter } from "./highpassFilter.js";
import { createLfoNode } from "./lfoNode.js";
import { createLowPassFilter } from "./lowpassFilter.js";
import { createOscillatorNode } from "./oscillatorNode.js";
import { createPhaser } from "./phaser.js";

export const play = (
  audioContext: AudioContext,
  options: ParametersState & { waveForm: number }
) => {
  const duration = options.attackTime + options.sustainTime + options.decayTime;
  const oscillator = createOscillatorNode(audioContext, options, duration);
  const gainNode = createGainEnvelope(audioContext, options);
  const lowpassFilter = createLowPassFilter(audioContext, options);
  const highpassFilter = createHighPassFilter(audioContext, options);

  const vibrato = createLfoNode(
    audioContext,
    options.vibratoDepth,
    options.vibratoRate
  );

  const tremolo = createLfoNode(
    audioContext,
    options.tremoloDepth,
    options.tremoloRate
  );

  vibrato.gain.connect(oscillator.frequency);
  tremolo.gain.connect(gainNode);


  // oscillator.connect(lowpassFilter);
  const phaser = createPhaser(audioContext,options);
  oscillator.connect(phaser.filter);
  phaser.filter.connect(lowpassFilter);
  lowpassFilter.connect(highpassFilter);
  highpassFilter.connect(gainNode);

  gainNode.connect(audioContext.destination);

  oscillator.start();
  vibrato.oscillator.start();
  tremolo.oscillator.start();
  phaser.oscillator.start()

  phaser.oscillator.stop(audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration);
  vibrato.oscillator.stop(audioContext.currentTime + duration);
  tremolo.oscillator.stop(audioContext.currentTime + duration);
};

