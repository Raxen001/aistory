class ImageGeneration{
  async generateImage(conciserText) {
    throw new Error('generateImage() must be implemented.');
  }
  getImagePath(){
    throw new Error('getImagePath() must be implemented.');
  }
}

export default ImageGeneration;
