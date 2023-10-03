const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const initApiRoute = (app) => {
  router.get("/users/getUsers", userController.getUserList);
  router.post("/users/authenticate", userController.authenticate);

  return app.use("/api/v1", router);
};

module.exports = initApiRoute;
