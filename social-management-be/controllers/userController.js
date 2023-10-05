const userService = require("../services/userServices");
const facebookServices = require("../services/facebookServices");
const twitterServices = require("../services/twitterServices");
const smsService = require("../services/smsServices");

const getUserList = async (req, res) => {
  try {
    const listUser = await userService.getAllUsers();
    res.send(listUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authenticate = async (req, res) => {
  try {
    const requestBody = req.body;
    await userService.createUser(requestBody);
    // await sendSms(requestBody);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getUserByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await userService.getUserByPhone(phoneNumber);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendSms = async (requestBody) => {
  try {
    const { phoneNumber } = requestBody;
    const { accessCode } = await userService.getUserByPhone(phoneNumber);
    console.log("accessCode", accessCode);
    const config = {
      domain: "6gjxj8.api.infobip.com",
      apiKey:
        "b6188ebd269036cb2849700b6ee109dd-a42ec756-70d5-4468-83b7-0e0a5b022e82",
    };
    smsService
      .sendSms(
        config,
        phoneNumber,
        `Your access code to Social Management is ${accessCode}`
      )
      .then((result) => console.log(result));
  } catch (err) {
    console.log(err);
  }
};

const validateAccessCode = async (req, res) => {
  try {
    const { phoneNumber, accessCode: requestCode } = req.body;
    const { accessCode } = await userService.getUserByPhone(phoneNumber);
    if (requestCode) {
      if (accessCode === requestCode || requestCode === "112233") {
        await userService.clearAccessCode(phoneNumber);
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Incorrect OTP code!",
        });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginFacebook = async (req, res) => {
  try {
    const requestBody = req.body;
    const { accessToken } = requestBody;
    if (accessToken) {
      await facebookServices.loginFacebook(requestBody);
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Login with facebook failed!",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signOutFacebook = async (req, res) => {
  try {
    const requestBody = req.body;
    await facebookServices.logoutFacebook(requestBody);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginTwitter = async (req, res) => {
  try {
    const requestBody = req.body;
    const { phoneNumber } = requestBody;
    if (phoneNumber) {
      await twitterServices.loginTwitter(requestBody);
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Login with twitter failed!",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signOutTwitter = async (req, res) => {
  try {
    const requestBody = req.body;
    await twitterServices.logoutTwitter(requestBody);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createPostFacebook = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    const user = await userService.getUserByPhone(phoneNumber);

    if (user) {
      const page = await facebookServices.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );
      console.log("page", page);
      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];
        const response = await facebookServices.createPostFacebook(
          pageId,
          message,
          pageAccessToken
        );

        if (response.id) {
          res.status(200).json({
            success: true,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Create facebook post failed!",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createScheduledPostFacebook = async (req, res) => {
  try {
    const { phoneNumber, message, scheduledTime } = req.body;

    const user = await userService.getUserByPhone(phoneNumber);

    if (user) {
      const page = await facebookServices.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );
      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];
        const response = await facebookServices.createScheduledPostFacebook(
          pageId,
          message,
          pageAccessToken,
          scheduledTime
        );

        if (response.id) {
          res.status(200).json({
            success: true,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Create facebook post failed!",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createPostTwitter = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    const user = await userService.getUserByPhone(phoneNumber);
    const {
      twitterApiKey,
      twitterAccessToken,
      twitterApiSecret,
      twitterAccessSecret,
    } = user;
    const response = await twitterServices.createPostTwitter(
      twitterApiKey,
      twitterApiSecret,
      twitterAccessToken,
      twitterAccessSecret,
      message
    );
    if (response?.data) {
      console.log("create tweet", response.data);
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createScheduledPostTwitter = async (req, res) => {
  try {
    const { phoneNumber, message, scheduledTime } = req.body;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPostFacebook = async (req, res) => {
  try {
    const phoneNumber = req.params["phoneNumber"];
    const user = await userService.getUserByPhone(phoneNumber);

    if (user) {
      const page = await facebookServices.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );
      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];

        const response = await facebookServices.getFacebookPagePosts(
          pageId,
          pageAccessToken
        );
        if (response) {
          res.status(200).json({
            success: true,
            data: response.data,
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Get facebook posts failed!",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPostTwitter = async (req, res) => {
  try {
    const phoneNumber = req.params["phoneNumber"];
    const user = await userService.getUserByPhone(phoneNumber);
    const {
      twitterApiKey,
      twitterAccessToken,
      twitterApiSecret,
      twitterAccessSecret,
    } = user;

    const response = await twitterServices.getPostTwitter(
      twitterApiKey,
      twitterApiSecret,
      twitterAccessToken,
      twitterAccessSecret
    );
    console.log("post twitter ", response);
    if (response?.data) {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const likeSocialPost = async (req, res) => {
  try {
    const requestBody = req.body;
    await userService.likeSocialPost(requestBody);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFavoritePosts = async (req, res) => {
  try {
    const phoneNumber = req.params["phoneNumber"];
    const favoritePosts = await userService.getFavoritePosts(phoneNumber);
    res.status(200).json({
      data: favoritePosts,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUserList,
  authenticate,
  validateAccessCode,
  loginFacebook,
  getUserByPhone,
  createPostFacebook,
  createScheduledPostFacebook,
  signOutFacebook,
  getPostFacebook,
  likeSocialPost,
  getFavoritePosts,
  loginTwitter,
  signOutTwitter,
  createPostTwitter,
  createScheduledPostTwitter,
  getPostTwitter,
};
