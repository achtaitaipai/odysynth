type LowpassFilterParams = {
    lowPassCutoff: number,
    lowPassResonance:number
}
export const createLowPassFilter = (audioContext:AudioContext, {lowPassCutoff,lowPassResonance}:LowpassFilterParams) => {
    const filter = audioContext.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = lowPassCutoff
    filter.Q.value = lowPassResonance
    return filter
}