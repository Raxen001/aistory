import { extract } from 'langextract'
import config from '../configs/configs.js'
import Conciser from './conciser.service.js'

const exampleData = [
    {
        text: "Lisa looked at the empty chair and sighed.\n'He said he'd be here,' she whispered.",
        extractions: [
            // {
            //     extractionClass: 'setting',
            //     extractionText: 'Real World',
            //     attributes: {},
            // },
            // {
            //     extractionClass: 'timeOfDay',
            //     extractionText: 'Evening',
            //     attributes: {},
            // },
            // {
            //     extractionClass: 'location',
            //     extractionText: 'a quiet room with an empty chair',
            //     attributes: {},
            // },
            // {
            //     extractionClass: 'story',
            //     extractionText:
            //         'Lisa waits for James, who has let her down despite usually keeping his promises.',
            //     attributes: {},
            // },
            {
                extractionClass: 'character',
                extractionText: 'Lisa',
                attributes: {
                    personName: 'Lisa',
                    personAlias: [],
                    personGender: 'FEMALE',
                    personDescription:
                        'Disappointed and alone, likely has expressive features and a quiet demeanor.',
                },
            },
            // {
            //     extractionClass: 'character',
            //     extractionText: 'James',
            //     attributes: {
            //         personName: 'James',
            //         personAlias: [],
            //         personGender: 'MALE',
            //         personDescription:
            //             'Absent from the scene. Known for keeping promises. Possibly close to Lisa.',
            //     },
            // },
        ],
    },
]

class LangExtract extends Conciser {
    async conciseThisText(userInputText) {
        const options = {
            // https://github.com/google/langextract/issues/102#issuecomment-3179322222
            promptDescription:
                'Extract name and gender. CRITICAL: Return valid JSON only. Escape all quotes and newlines properly.',
            examples: exampleData,
            modelType: config.RESPOSNE_MODELS,
            apiKey: config.GEMINI_API_KEY,
        }

        try {
            const result = await extract(userInputText, options)
            console.log('Extraction successful:', result)

            return result;
        } catch (error) {
            if (error.code === 'INVALID_API_KEY') {
                console.error('Invalid API key provided')
            } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
                console.error(
                    'Rate limit exceeded, retry after:',
                    error.retryAfter
                )
            } else if (error.code === 'VALIDATION_ERROR') {
                console.error('Validation error:', error.details)
            } else {
                console.error('Unexpected error:', error.message)
            }
        }
    }
}

export default LangExtract
