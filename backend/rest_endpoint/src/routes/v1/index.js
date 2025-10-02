import express from 'express'
import conciserRoute from './conciser.route.js'

const router = express.Router()

const defaultRoutes = [
    {
        path: '/conciser',
        route: conciserRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
