const ConciseTextModel = Object.freeze({
  MODEL: "",
  CONFIG: "", //make sure to declare config that are only related to text gen here.
});

const VoiceModel = Object.freeze({
  MODEL: "",
  CONFIG: "", //make sure to declare config that are only related to voice gen here.
});

const ImageModel = Object.freeze({
  MODEL: "",
  CONFIG: "", //make sure to declare config that are only related to image gen here.
});

//if we switch models , we can just put a model as const here.
//to access the enums ,  import { VoiceModel } from "../config/configEnum"  and VoiceModel.$variables.

module.exports = {
  VoiceModel,
  ImageModel,
  ConciseTextModel,
};
