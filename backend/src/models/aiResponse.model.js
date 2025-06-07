import { Type } from '@google/genai'

//{
//     "characters": [...list of characters in the passage],
//     "place": "para about the place they are in",
//     "setting": "Fantasy or cyberpunk or Current",
//     "time": "approximate time the passage takes place",
// }

const AIResponseConfig = {
    responseMimeType: 'application/json',
    responseSchema: {
        type: Type.OBJECT,
        properties: {
            setting: {
                type: Type.STRING,
            },
            time: {
                type: Type.STRING,
            },
            place: {
                type: Type.STRING,
            },
            characters: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING,
                },
            },
            story: {
                type: Type.STRING,
            },
        },
        propertyOrdering: ['setting', 'time', 'place', 'characters', 'story'],
    },
}

export default AIResponseConfig
