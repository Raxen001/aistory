import Gemini from './gemini.conciser.impl.js'
import { ImageGenImpl } from './gemini.imageGen.impl.js'
import { CharacterImageGenImpl } from './gemini.characterImageGen.impls.js'

export const conciserService = new Gemini()
// export const audioGenService = new AudioGenImpl();//just added a dummmy entry for audiogen.
export const imageGenService = new ImageGenImpl()
export const charImageGenService = new CharacterImageGenImpl()
