import { round } from "../number.js";
import { initialParameters, parametersFields, type ParametersState } from "../parameters.js";
import { Random } from "../random.js";

export const initial = (_?: number): ParametersState => {
  return initialParameters;
};
export const pickup = (seed?: number): ParametersState => {
  const rand = new Random(seed);

  const pitch = rand.boolean(0.5)
    ? {
        pitchDelta: rand.int(100, 500),
        pitchDuration: 0,
        pitchDelay: round(rand.uniform(0, 0.7), 2),
      }
    : {};

  return {
    ...initialParameters,
    waveForm: rand.fromArray([0, 1, 2, 3]),
    sustainPunch: round(rand.uniform(0, 0.8), 2),
    sustainTime: round(rand.uniform(0.05, 0.2), 2),
    decayTime: round(rand.uniform(0.1, 0.3), 2),
    frequency: rand.int(900, 1700),
    ...pitch,
  };
};

export const laser = (seed?: number): ParametersState => {
  const rand = new Random(seed);
  const frequency = rand.int(100, 1300);
  return {
    ...initialParameters,
    waveForm: rand.fromArray([0, 1, 2, 3]),
    sustainPunch: round(rand.uniform(0, 0.8), 2),
    sustainTime: round(rand.uniform(0.05, 0.1), 2),
    decayTime: round(rand.uniform(0, 0.2), 2),
    frequency,
    pitchDelta: rand.int(-frequency, -100),
    pitchDuration: 1,
    pitchDelay: rand.fromArray([0, round(rand.uniform(0, 0.3), 2)]),
  };
};

export const jump = (seed?: number): ParametersState => {
  const rand = new Random(seed);

  return {
    ...initialParameters,
    waveForm: rand.fromArray([1, 2]),
    sustainPunch: round(rand.uniform(0, 0.8), 2),
    sustainTime: round(rand.uniform(0.2, 0.5), 2),
    decayTime: round(rand.uniform(0.1, 0.2), 2),
    frequency: rand.int(100, 500),
    pitchDelta: rand.int(200, 500),
    pitchDuration: 1,
    pitchDelay: rand.fromArray([0, round(rand.uniform(0, 0.3), 2)]),
  };
};

export const fall = (seed?: number): ParametersState => {
  const rand = new Random(seed);

  const frequency = rand.int(80, 500);

  return {
    ...initialParameters,
    waveForm: rand.fromArray([1, 2, 3]),
    sustainPunch: 0,
    sustainTime: round(rand.uniform(0.2, 0.5), 2),
    decayTime: round(rand.uniform(0.2, 0.5), 2),
    frequency,
    pitchDelta: -frequency,
    pitchDuration: 1,
    pitchDelay: round(rand.uniform(0, 0.2), 2),
    vibratoRate: rand.int(8, 18),
    vibratoDepth: rand.int(10, 30),
    tremoloRate: rand.int(5, 18),
    tremoloDepth: round(rand.uniform(0, 1), 2),
  };
};

export const powerUp = (seed?: number): ParametersState => {
  const rand = new Random(seed);

  return {
    ...initialParameters,
    waveForm: rand.fromArray([0, 1, 2, 3]),
    sustainPunch: round(rand.uniform(0, 1), 2),
    sustainTime: round(rand.uniform(0.2, 0.5), 2),
    decayTime: round(rand.uniform(0.1, 0.5), 2),
    frequency: rand.int(200, 1000),
    pitchDelta: rand.int(100, 300),
    pitchDuration: 1,
    pitchDelay: rand.fromArray([0, round(rand.uniform(0, 0.3), 2)]),
    vibratoRate: rand.int(10, 18),
    vibratoDepth: rand.int(50, 100),
  };
};

export const fart = (seed?: number): ParametersState => {
  const rand = new Random(seed);

  const frequency = rand.int(10, 80);

  return {
    ...initialParameters,
    waveForm: 1,
    sustainPunch: round(rand.uniform(0, 0.5), 2),
    sustainTime: 0.1,
    decayTime: round(rand.uniform(0.3, 0.5), 2),
    frequency,
    pitchDelta: -frequency / 2,
    pitchDuration: 1,
    pitchDelay: 0.1,
    vibratoRate: rand.int(8, 18),
    vibratoDepth: rand.int(10, 30),
    tremoloRate: rand.int(35, 70),
    tremoloDepth: round(rand.uniform(0.6, 1), 2),
    lowPassCutoff: frequency * 10,
    lowPassResonance: 10,
  };
};

export const random = (seed?:number)=>{
  const rand = new Random(seed);
  const params = {...initialParameters}
  for (let index = 0; index < parametersFields.length; index++) {
    const element = parametersFields[index];
    if(element.type === "range"){
      params[element.name] = round(rand.uniform(element.min,element.max),2)
    }
    else if (element.type==='radio'){
      params[element.name] = rand.fromArray(element.options.map(e=>e.value))
    }
  }
  return params
}
