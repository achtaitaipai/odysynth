export type VibratoParams = {
    vibratoDepth: number,
    vibratoRate: number
}
export const createLfoNode = (audioContext:AudioContext, depth: number, rate:number) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
  
    oscillator.frequency.value = rate;
    gain.gain.value = depth;
    oscillator.connect(gain);
    return {oscillator, gain}
}