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
                description: 'Make the folloing story text concise without losing the overall story plotlines. Do not make the concise too small as to losing major plot points. Keep characters, keep major events.'
            },
            peopleList: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        personName: {
                            type: Type.STRING,
                        },
                        personAlias: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                        },
                        personGender: {
                            type: Type.STRING,
                            enum: ['MALE', 'FEMALE', 'TRANS'],
                        },
                        personDescription: {
                            type: Type.STRING,
                            description: 'Describe how the person looks, their face, their color, their type etc.'
                        },
                    },
                },
            },
        },
        propertyOrdering: [
            'setting',
            'timeOfDay',
            'location',
            'characters',
            'story',
            'peopleList',
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
