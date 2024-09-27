export type GainNoneParams = {
  attackTime: number;
  sustainTime: number;
  sustainPunch: number;
  decayTime: number;
};
export const createGainEnvelope = (
  audioContext: AudioContext,
  { attackTime, sustainTime, sustainPunch, decayTime }: GainNoneParams
): AudioNode => {
  const gainNode = audioContext.createGain();
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1 - sustainPunch, now + attackTime);
  gainNode.gain.setValueAtTime(1, now + attackTime);
  gainNode.gain.linearRampToValueAtTime(1 - sustainPunch , now + attackTime + sustainTime);
  gainNode.gain.linearRampToValueAtTime(0, now + attackTime + sustainTime + decayTime);

  return gainNode;
};
