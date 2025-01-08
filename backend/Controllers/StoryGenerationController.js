import {
    combine,
    GenerateConciseText,
    GenerateImage,
    TextToSpeechHandler,
} from "../utils";
const rateLimitdelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Processes an array of numbers.
 * @param {string} userInput - user input from the frontend
 */
export async function generateStory(userInput) {
  const imageFiles = [];
  const audioFiles = [] ;
  try {
    const conciseText = await GenerateConciseText(userInput); // i need to do the splitting and srt file gen.
    const tasks = [
      GenerateImage(subtitleIndex, conciseText).then((image) => {
        imageFiles.push(image);
      }),
      TextToSpeechHandler(conciseText).then((audio)=>{
        audioFiles.push(audio)
      }),
    ];
    await Promise.all(tasks);
    const videoURL = await combine(imageFiles , audioFiles[0] , conciseText );
    res.status(200).json({ videoURL });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
