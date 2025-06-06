import { Type } from '@google/genai'

const AIResponseConfig = {
    responseMimeType: 'application/json',
    responseSchema: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                recipeName: {
                    type: Type.STRING,
                },
                ingredients: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                    },
                },
            },
            propertyOrdering: ['recipeName', 'ingredients'],
        },
    },
}

export default AIResponseConfig
