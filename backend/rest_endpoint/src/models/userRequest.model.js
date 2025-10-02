const userRequest = {
    type: 'object',
    properties: {
        userId: { type: 'string', maxLength: 36 }, // UUID 36 length
        bookId: { type: 'string', maxLength: 36 }, // UUID 36 length
        userText: { type: 'string'}, // tokens
    },
    required: ['userId', 'userText'],
    additionalProperties: false,
}

export default userRequest
