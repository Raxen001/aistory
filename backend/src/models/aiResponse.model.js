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
                enum: ['Fantasy', 'Real World', 'CyberPunk', 'SteamPunk'],
            },
            timeOfDay: {
                type: Type.STRING,
            },
            location: {
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
        propertyOrdering: [
            'setting',
            'timeOfDay',
            'location',
            'characters',
            'story',
        ],
    },
}

// person aliases
// person facial strucutre
// ethinicity
// markings {}
// -> image
// -> cache

export default AIResponseConfig
