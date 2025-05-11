import express from "express";

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

router.route("/").get((req, res) => {
  res.send("hahahah");
});

export default router;
