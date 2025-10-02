import PImage from 'pureimage';
import fs from 'fs';

async function loadImagePImage(pathToFile) {
  return await PImage.decodePNGFromStream(fs.createReadStream(pathToFile));
}

function drawSpeechBubble(ctx, x, y, text, maxWidth) {
  const fontSize = 18;
  const padding = 10;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const width = ctx.measureText(currentLine + ' ' + words[i]).width;
    if (width < maxWidth - padding * 2) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);

  const lineHeight = fontSize * 1.4;
  const bubbleHeight = lines.length * lineHeight + padding * 2;

  ctx.fillRect(x, y, maxWidth, bubbleHeight);
  ctx.strokeRect(x, y, maxWidth, bubbleHeight);

  ctx.fillStyle = 'black';
  lines.forEach((line, i) => {
    ctx.fillText(line, x + padding, y + padding + i * lineHeight);
  });
}

async function generateVerticalHorizontalPage(images, dialogues, output) {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const canvas = PImage.make(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Define panels:
  const panel1 = { x: 0, y: 0, width: 300, height: 600 };   
  const panel2 = { x: 300, y: 0, width: 500, height: 300 };  
    const panel3 = { x: 300, y: 300, width: 500, height: 300 }; 

  const img1 = await loadImagePImage(images[0]);   ctx.drawImage(img1, 0, 0, img1.width, img1.height, panel1.x, panel1.y, panel1.width, panel1.height);

  drawSpeechBubble(ctx, panel1.x + 10, panel1.y + 10, dialogues[0], panel1.width - 20);


  const img2 = await loadImagePImage(images[1]);
  ctx.drawImage(img2, 0, 0, img2.width, img2.height, panel2.x, panel2.y, panel2.width, panel2.height);
  drawSpeechBubble(ctx, panel2.x + 10, panel2.y + 10, dialogues[1], panel2.width - 20);

  const img3 = await loadImagePImage(images[1]);
  ctx.drawImage(img3, 0, 0, img3.width, img3.height, panel3.x, panel3.y, panel3.width, panel3.height);
  drawSpeechBubble(ctx, panel3.x + 10, panel3.y + 10, dialogues[1], panel3.width - 20);
  await PImage.encodePNGToStream(canvas, fs.createWriteStream(output));
  console.log(`✅ Saved: ${output}`);
}

async function run() {
  await generateVerticalHorizontalPage(
    ['img1.png', 'img2.png', 'img3.png'],
    ['This is a tall vertical panel!', 'And here is a wide horizontal panel!'],
    'vertical_horizontal_page.png'
  );
}

run();
