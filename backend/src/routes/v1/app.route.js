import express from "express";
import userRequestValid from "../../validations/userRequest.js";
// import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

// epub or text -> validation check
// concise text
// image gen(concise text) -> async
// voice gen -> async
// ffmpeg stiching (ass sass -> srt format)
// /tmp/uuid
// return -> 200 return
// cleanup
// timely -> clean up

// router.route("/").get(requireAuth(), async (req, res) => {
//
router.route("/").get(userRequestValid, async (req, res) => {
  res.send({
    response: "Hello world",
  });
});

export default router;
