import dotenv from 'dotenv'
dotenv.config()

import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import { writeFile } from 'fs/promises'
import textToSpeech from './textToSpeech.service.js'

class textToSpeechServiceImpl extends textToSpeech {
    constructor() {
        super()
        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            throw new Error(
                'Missing GOOGLE_APPLICATION_CREDENTIALS env variable'
            )
        }
        this.client = new TextToSpeechClient()
    }

    async synthesizeText(text, outputFileName = 'output.mp3') {
        try {
            // Construct the request
            const request = {
                input: { text: text },
                // Select the language and SSML voice gender (optional)
                voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
                // select the type of audio encoding
                audioConfig: { audioEncoding: 'MP3' },
            }

            // Performs the text-to-speech request
            const [response] = await this.client.synthesizeSpeech(request)

            // Save the generated binary audio content to a local file
            await writeFile(
                `${outputFileName}.mp3`,
                response.audioContent,
                'binary'
            )
            console.log('Audio content written to file: output.mp3')
            return `${outputFileName}.mp3`
        } catch (error) {
            console.error('ERROR in TextToSpeechService:', error)
            throw error
        }
    }

    convertThisText(text, outputFileName = 'output2.mp3') {
        return this.synthesizeText(text, outputFileName)
    }
}

export default textToSpeechServiceImpl
