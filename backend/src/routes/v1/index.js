const express = require("express");
const appRoute = require("./app.route");

const router = express.Router();


const defaultRoutes = [
  {
        path: "/app",
        route: appRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
