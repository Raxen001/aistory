import express from 'express';
import appRoute from "./app.route.js";
import authRoute from "./auth.route.js";

const router = express.Router();


const defaultRoutes = [
  {
        path: "/app",
        route: appRoute,
  },
  {
        path: "/auth",
        route: authRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
