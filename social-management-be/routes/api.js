const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const initApiRoute = (app) => {
  router.get("/users/getUsers", userController.getUserList);
  router.post("/users/authenticate", userController.authenticate);
  router.post("/users/validateAccessCode", userController.validateAccessCode);
  router.post("/users/getUserByPhone", userController.getUserByPhone);
  router.post("/users/loginFacebook", userController.loginFacebook);
  router.post("/users/signOutFacebook", userController.signOutFacebook);
  router.post("/users/createPostFacebook", userController.createPostFacebook);
  router.post(
    "/users/createScheduledPostFacebook",
    userController.createScheduledPostFacebook
  );
  router.get(
    "/users/getPostFacebook/:phoneNumber",
    userController.getPostFacebook
  );
  router.post("/users/likeSocialPost", userController.likeSocialPost);
  router.get(
    "/users/getFavoritePosts/:phoneNumber",
    userController.getFavoritePosts
  );

  return app.use("/api/v1", router);
};

module.exports = initApiRoute;
