type HighpassFilterParams = {
    highPassCutoff: number,
    highPassResonance:number
}
export const createHighPassFilter = (audioContext:AudioContext, {highPassCutoff,highPassResonance}:HighpassFilterParams) => {
    const filter = audioContext.createBiquadFilter()
    filter.type = "highpass"
    filter.frequency.value = highPassCutoff
    filter.Q.value = highPassResonance
    return filter
}