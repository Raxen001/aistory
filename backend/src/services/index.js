import { ImageGenImpl } from './gemini.imageGen.impl.js'
import Gemini from './gemini.conciser.impl.js'
import textToSpeechImpl from './textToSpeech.impl.js'

// export const audioGenService = new AudioGenImpl();//just added a dummmy entry for audiogen.
export const imageGenService = new ImageGenImpl()
export const conciserService = new Gemini()
export const textToSpeech = new textToSpeechImpl()
