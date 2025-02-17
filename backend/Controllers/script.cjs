
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Function to convert MKV to MP4
function convertMkvToMp4(inputFilePath, outputFilePath) {
  ffmpeg(inputFilePath)
    .output(outputFilePath)
    .on('end', () => {
      console.log('Conversion complete');
    })
    .on('error', (err) => {
      console.log('Error during conversion: ', err);
    })
    .run();
}

// Example usage
const inputFile = path.join(__dirname, 'movie.mkv'); // Path to your MKV file
const outputFile = path.join(__dirname, 'movie.mp4'); // Desired output MP4 file

convertMkvToMp4(inputFile, outputFile);
