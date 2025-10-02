import { requireAuth } from "@clerk/express";
import express from "express";
import appController from "../../controllers/appController.js";
import userRequestValid from "../../validations/userRequest.js";

const router = express.Router()

// router.route("/").get(requireAuth(), async (req, res) => {

// router.route('/').post(requireAuth(), userRequestValid, async (req, res) => {
router.route('/').post( userRequestValid, async (req, res) => {
    const result = await appController(req, res)

    if (!result) {
        return res.send(
            {
                response: '500 INTERNAL SERVER ERROR',
            },
            500
        )
    }

    res.send(result)
})

export default router
