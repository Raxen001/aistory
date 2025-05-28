import express from "express";
import userRequestValid from "../../validations/userRequest.js";
// import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const router = express.Router();


// router.route("/").get(requireAuth(), async (req, res) => {
//
router.route("/").get(userRequestValid, async (req, res) => {
  res.send({
    response: "Hello world",
  });

});

export default router;
