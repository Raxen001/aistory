const userRequest = {
  type: "object",
  properties: {
    userId: { type: "string", maxLength: 36 }, // UUID 36 length
    userText: { type: "string", maxLength: 200 }, // tokens
  },
  required: ["userId", "userText"],
  additionalProperties: false,
};

export default userRequest;
