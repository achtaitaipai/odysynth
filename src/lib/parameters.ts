import { isStringNumber } from "./string.js";

type Field =
  | {
      name: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      type: "range";
    }
  | {
      name: string;
      options: number[];
      defaultValue: number;
      type: "radio";
    };

type Params = { group: string; fields: Field[] }[];

export const parameters = [
  {
    group: "waveForm",
    fields: [
      {
        name: "waveForm",
        defaultValue: 0,
        type: "radio",
        options: [
          { value: 0, label: "Sine" },
          { value: 1, label: "SawTooth" },
          { value: 2, label: "Square" },
          { value: 3, label: "Triangle" },
        ],
      },
    ],
  },
  {
    group: "soundEnveloppe",
    fields: [
      {
        name: "attackTime",
        min: 0,
        max: 2,
        step: 0.01,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "sustainTime",
        min: 0,
        max: 2,
        step: 0.01,
        type: "range",
        defaultValue: 0.07,
      },
      {
        name: "sustainPunch",
        min: 0,
        max: 1,
        step: 0.01,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "decayTime",
        min: 0,
        max: 2,
        step: 0.01,
        type: "range",
        defaultValue: 0.3,
      },
    ],
  },
  {
    group: "pitch",
    fields: [
      {
        name: "frequency",
        min: 0,
        max: 4000,
        step: 1,
        type: "range",
        defaultValue: 700,
      },
      {
        name: "pitchDelta",
        min: -4000,
        max: 4000,
        step: 1,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "pitchDuration",
        min: 0,
        max: 1,
        step: 0.01,
        type: "range",
        defaultValue: 1,
      },
      {
        name: "pitchDelay",
        min: 0,
        max: 1,
        step: 0.01,
        type: "range",
        defaultValue: 0,
      },
    ],
  },
  {
    group: "vibrato",
    fields: [
      {
        name: "vibratoRate",
        min: 0,
        max: 70,
        step: 1,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "vibratoDepth",
        min: 0,
        max: 100,
        step: 1,
        type: "range",
        defaultValue: 0,
      },
    ],
  },
  {
    group: "tremolo",
    fields: [
      {
        name: "tremoloRate",
        min: 0,
        max: 70,
        step: 1,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "tremoloDepth",
        min: 0,
        max: 1,
        step: 0.01,
        type: "range",
        defaultValue: 0,
      },
    ],
  },
  {
    group: "filters",
    fields: [
      {
        name: "highPassCutoff",
        min: 0,
        max: 4000,
        step: 0.1,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "highPassResonance",
        min: 0,
        max: 30,
        step: 0.1,
        type: "range",
        defaultValue: 0,
      },
      {
        name: "lowPassCutoff",
        min: 0,
        max: 4000,
        step: 0.1,
        type: "range",
        defaultValue: 4000,
      },
      {
        name: "lowPassResonance",
        min: 0,
        max: 30,
        step: 0.1,
        type: "range",
        defaultValue: 0,
      },
    ],
  },
  {
    group: "phaser",
    fields: [
      {
        name: "phaserBaseFrequency",
        min: 0,
        max: 1000,
        step: 1,
        type: "range",
        defaultValue: 100,
      },
      {
        name: "phaserLfoFrequency",
        min: 0,
        max: 200,
        step: 1,
        type: "range",
        defaultValue: 50,
      },
      {
        name: "phaserDepth",
        min: 0,
        max: 1000,
        step: 1,
        type: "range",
        defaultValue: 0,
      },
    ],
  },
] as const;

export type ParametersState = Record<
  (typeof parameters)[number]["fields"][number]["name"],
  number
>;

export const parametersFields = parameters.flatMap((el) => [...el.fields]);

export const initialParameters = parametersFields.reduce(
  (acc, el) => ({ ...acc, [el.name]: el.defaultValue }),
  {}
) as ParametersState;

export const getParametersFromString = (text?: string | null) => {
  if (!text) return  {...initialParameters} 
  const urlState = decodeURI(text).split(",");
  const newState = { ...initialParameters };
  for (let index = 0; index < parametersFields.length; index++) {
    const value = urlState[index];
    const name = parametersFields[index].name;
    if (isStringNumber(value))
      newState[name] = Number(value);
  }
  return newState ;
};
