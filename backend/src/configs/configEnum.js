import { Modality } from "@google/genai";

export const ConciseTextModel = Object.freeze({
  MODEL: "",
  CONFIG: "", //make sure to declare config that are only related to text gen here.
});

export const VoiceModel = Object.freeze({
  MODEL: "",
  CONFIG: "", //make sure to declare config that are only related to voice gen here.
});

export const ImageModel = Object.freeze({
  MODEL: "gemini-2.0-flash-preview-image-generation",
  CONFIG: {
    responseModalities: [Modality.TEXT, Modality.IMAGE],
  },
});

//if we switch models , we can just put a model as const here.
//to access the enums ,  import { VoiceModel } from "../config/configEnum"  and VoiceModel.$variables.