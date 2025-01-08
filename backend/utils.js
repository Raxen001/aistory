import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import PlayHT from "playht";
import { v4 as uuidv4 } from "uuid";

const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//dont curse me for this hardcoding , i just need to finish this off real quick and play apex lol
const FILLER_WORDS =
  "generate the concise narrator point of view dialogue alone for this story, include the introductions in third person, as a narrative voice like 'Once upon a time' in 100 - 200 words";
const OUTPUT_DIR = process.env.OUTPUT_CONCISE_DIR;
const FILENAME = process.env.OUTPUT_CONCISE_FILENAME;
const OUTPATH = path.join(OUTPUT_DIR, `${FILENAME}.txt`);
const api_key = process.env.IMAGE_API_KEY;
//for now used segmind as they give  1$ to test out the api.
const url = "https://api.segmind.com/v1/flux-1.1-pro";

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}
/**
 * Processes an array of numbers.
 * @param {image[]} image - An array of images to be concatinated
 * @param {audio} audio - audio file to add to the images
 * @param {srt} subtitles - subtitles file to be added
 * @return {url} - an url of the video file in the tmp
 */
export async function combine(image, audio, srt) {
  return "http://<domain>/session/UUID.mp4";
}

export async function GenerateConciseText(input) {
  const prompt = input + `${FILLER_WORDS}`;
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  fs.writeFileSync(OUTPATH, result.response.text()); //for reference
  return result.response.text();
}

export async function TextToSpeechHandler(text) {
  const UUID = uuidv4();
  const OUTPUTFILE = "../temp/" + UUID + ".mp3";
  try {
    const fileStream = fs.createWriteStream(OUTPUTFILE);
    //someone give feedback on the tts engine
    const stream = await PlayHT.stream(text, { voiceEngine: "Play3.0-mini" });
    stream.pipe(fileStream);
    console.log("The Audio output saved to " + OUTPUTFILE);//for reference
    return stream;
  } catch (error) {
    console.error("Error Converting Text To Speech " + error);
  }
}

export async function GenerateImage(text) {
  const formData = new FormData();
  formData.append("seed", 12345);
  formData.append("width", 1024);
  formData.append("height", 1024);
  formData.append("prompt", text);
  formData.append("aspect_ratio", "1:1");
  formData.append("output_format", "png");
  formData.append("output_quality", 80);
  formData.append("safety_tolerance", 2);
  formData.append("prompt_upsampling", "false");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "x-api-key": api_key,
        ...formData.getHeaders(),
      },
      responseType: "arraybuffer",
    });
    console.log(response);
    if (response.data) {
      if (Buffer.isBuffer(response.data)) {
        const index = uuidv4();
        const imagePath = `../generated_images/image_${index}.jpg`;
        fs.writeFileSync(imagePath, response.data);//for reference
        console.log(`Image of ${index} saved as ${imagePath}`);
        return response.data;
      } else {
        console.error("Received data is not a valid Buffer.");
      }
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}
