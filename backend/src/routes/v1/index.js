import express from 'express';
import appRoute from "./app.route.js";

const router = express.Router();


const defaultRoutes = [
  {
        path: "/app",
        route: appRoute,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
