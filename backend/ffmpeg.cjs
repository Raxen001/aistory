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
const { spawn } = require('node:child_process');
// TODO: GENERATE INPUT.TXT AND INCLUDE URLS
const INPUT_TXT = './assets/input.txt';
const INPUT_AUDIO = './assets/audio.mp3';
const INPUT_SUB = './assets/subtitle.srt';
const OUPUT_FILE = './output/output.mp4';
const FFMPEG_OPTIONS = [
    '-f', 'concat',
    '-i', INPUT_TXT,
    '-i', INPUT_AUDIO,
    '-vf', `subtitles=${INPUT_SUB}`,
    '-c:v', 'libx264',
    '-r', '30', '-pix_fmt', 'yuv420p',
    './output/output.mp4', '-y'
]
const proc = spawn( 'ffmpeg', FFMPEG_OPTIONS);
// output
proc.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
// error
proc.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
// exit
proc.on('close', (code) => { console.log(`child process exited with code ${code}`); });
