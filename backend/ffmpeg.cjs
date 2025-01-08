// TODO:**maybe outdate**
// /tmp/session(UUID)/
//                   |
//                   |-> ffmpeg-concat-options.txt
//                   |
//                   |-> images{1,2,3,4}.jpg
//                   |
//                   |-> audio.mp3
//                   |
//                   |-> subtitle.srt
//                   |
//                   |-> OUTPUT.mp4 (after ffmpeg completion)
//
//
//


/**
 * @return {url} - return url of the uploaded artifact
*/
async function upload(video){
    // upload
    return "https://example.com/test.mp4"
}

// TODO: create a temp directory.
// TODO: GENERATE INPUT.TXT AND INCLUDE URLS
// TODO: remove the temp directory after generation of video
// TODO: generate .ass instead of srt
// list of urls of images, audio would be nice
/**
 * Processes an array of numbers.
 * @param {image[]} image - An array of images to be concatinated
 * @param {audio} audio - audio file to add to the images
 * @param {srt} subtitles - subtitles file to be added
 * @return {url} - an url of the video file in the tmp
 */
// spwan subprocess
const { spawn } = require('node:child_process');

//file system related imports
const fs = require('node:fs');
const os = require('os');  
const path = require('path'); 

function combine(images, audio, subtitle){
    
    // creating temporary directory
    let tmp_dir = '/tmp/'; // fallback temporary directory
    tmp_dir = fs.mkdtempSync(
        path.join(os.tmpdir(), "ai_story_temp-"), 
        (err, folder) => {
            if(err){
                console.log(`[ERROR]: can't create temporary directory: ${err}`);
            }     
            else{
                console.log(`[LOG]: Created temporary directory: ${folder}`)
                tmp_dir = folder;
            }
        }
    );
    console.log("[FUCK]: ", tmp_dir);
    const INPUT_TXT = './assets/input.txt';
    const INPUT_AUDIO = './assets/audio.mp3';
    const INPUT_SUB = './assets/subtitle.srt';
    const OUTPUT_FILE = './output/output.mp4';

    const FFMPEG_OPTIONS = [
        '-f', 'concat',
        '-i', INPUT_TXT,
        '-i', INPUT_AUDIO,
        '-vf', `subtitles=${INPUT_SUB}`,
        '-c:v', 'libx264',
        '-r', '30', '-pix_fmt', 'yuv420p',
        OUTPUT_FILE, '-y'
    ]

    const proc = spawn( 'ffmpeg', FFMPEG_OPTIONS);
    // output
    proc.stdout.on('data', (data) => { console.log(`[LOG]: ${data}`); });
    // error
    proc.stderr.on('data', (data) => { console.error(`[ERROR]: ${data}`); });
    // exit
    proc.on('close', 
        (code) => { 
            console.log(`[WARN]:FFMPEG return code: ${code}`); 
            //TODO: UPLOAD, uncomment this later
            //fs.rm(OUTPUT_FILE,
            //(err)=> {
            //        if(err){
            //            console.log(`[ERROR]: FILE error: ${err}`);
            //        }
            //        else{
            //            console.log("[LOG]: FILE Deletion successfuly.");
            //        }
            //    });

        });
}
//combine();
