const userRequest = {
  type: "object",
  properties: {
    userId: { type: "string" },
    text: { type: "string" }
  },
  required: ["userId", "text"],
  additionalProperties: false,
};

export default userRequest;
