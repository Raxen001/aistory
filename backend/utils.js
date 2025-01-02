
import { createFFmpeg } from '@ffmpeg/ffmpeg';


const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

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
function combine(image, audio, srt){
    const ffmpeg = await getFFmpeg();
    let outputData = null;

    // if the input is object files and not paths
    // for audio 
    let inputFileName = "/tmp/something"; // change this later to uuid
    ffmpeg.FS('writeFile', inputFileName, audio);

    // TODO do the same shit as above for images and srt
    //


    // TODO
    // /tmp/session(UUID)/
    //              |
    //              |-> ffmpeg-concat-options.txt
    //              |
    //              |-> images{1,2,3,4}.jpg
    //              |
    //              |-> audio.mp3
    //              |
    //              |-> subtitle.srt
    //              |
    //              |-> OUTPUT.mp4 (after ffmpeg completion)
    //      


    await ffmpeg.run(
        '-ss', '00:00:01.000',
        '-i', inputFileName,
        '-frames:v', '1',
        outputFileName
    );

    outputData = ffmpeg.FS('readFile', outputFileName);
    ffmpeg.FS('unlink', inputFileName);
    ffmpeg.FS('unlink', outputFileName);
    return "http://<domain>/session/UUID.mp4"
}

