import express from "express";
import { clerkClient, requireAuth, getAuth } from '@clerk/express'

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

router.route("/").get( requireAuth(), async (req, res) => {
  res.json("hahahah");
});

export default router;
