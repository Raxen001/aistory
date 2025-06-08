import { ImageGenImpl } from './imageGenImpl.js';

//make an entry here for any new service handling.
export const audioGenService = new AudioGenImpl();//just added a dummmy entry for audiogen.
export const imageGenService = new ImageGenImpl();

//for testing
// const imageGen = new ImageGenImpl(ImageModel.MODEL,ImageModel.CONFIG);

// imageGen.generateImage({
//   characters: ["Luna", "Kiran"],
//   place: "Tokyo alley",
//   setting: "fantasy",
//   time: "Morning",
//   story: "Luna confronts Kiran under sun"
// });