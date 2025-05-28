import Ajv from "ajv";

function userRequestScehmaValidate(req, res, next) {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      userId: { type: "string" },
    },
    required: ["userId"],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (valid) {
    next();
  }

  // TODO: create invalid request page
  res.send(
    {
      response: "Error Invalid Reqeust",
    },
    400,
  );
}

export default userRequestScehmaValidate;
