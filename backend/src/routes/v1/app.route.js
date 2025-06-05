import express from 'express'
import { requireAuth } from '@clerk/express'
import userRequestValid from '../../validations/userRequest.js'
import appController from '../../controllers/appController.js'

const router = express.Router()

// router.route("/").get(requireAuth(), async (req, res) => {

router.route('/').post(requireAuth(), userRequestValid, async (req, res) => {
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
