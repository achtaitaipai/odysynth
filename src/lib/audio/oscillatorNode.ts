export type OscillatorNodeParams = {
  waveForm: number;
  frequency: number;
  pitchDelta: number;
  pitchDuration: number;
  pitchDelay: number;
};

const OSCILLATORTYPES:OscillatorType[] = ['sine','sawtooth','square','triangle']

export const createOscillatorNode = (
  audioContext: AudioContext,
  {
    waveForm,
    frequency,
    pitchDelta,
    pitchDuration: pitchDurationFactor,
    pitchDelay: pitchDelayFactor,
  }: OscillatorNodeParams,
  durationTime: number
): OscillatorNode => {
  const pitchDelayTime = durationTime * pitchDelayFactor;
  const pitchDurationTime =
    (durationTime - pitchDelayTime) * pitchDurationFactor;
  const oscillator = audioContext.createOscillator();
  oscillator.type = OSCILLATORTYPES[waveForm];
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.frequency.linearRampToValueAtTime(
    frequency,
    audioContext.currentTime + pitchDelayTime
  );
  oscillator.frequency.linearRampToValueAtTime(
    Math.max(0, frequency + pitchDelta),
    audioContext.currentTime + pitchDelayTime + pitchDurationTime
  );
  return oscillator;
};