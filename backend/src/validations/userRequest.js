import Ajv from "ajv";
import userRequest from "../models/userRequest.js";

function userRequestScehmaValidate(req, res, next) {
  const ajv = new Ajv();

  const validate = ajv.compile(userRequest);
  const valid = validate(req.body);

  if (valid) {
    return next();
  }

  // TODO: create invalid request page
  return res.send(
    {
      response: "Error Invalid Reqeust",
    },
    400,
  );
}

export default userRequestScehmaValidate;
