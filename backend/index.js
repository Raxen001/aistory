import cors from 'cors';
import express from 'express';
import { generateStory } from './Controllers/storyGenerationController';

const app = express();
const port = 3000;
app.use(cors());

async function getData() {
  const url = "http://localhost:5000/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
app.use("/api/generate" ,generateStory);
// getData();
app.listen(port, () => {
    console.log(`[info] ffmpeg-api listening at http://localhost:${port}`)
});

