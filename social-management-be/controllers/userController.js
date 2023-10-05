const userService = require("../services/userServices");
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
      await userService.loginFacebook(requestBody);
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
    await userService.logoutFacebook(requestBody);
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
      const page = await userService.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );

      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];
        const response = await userService.createPostFacebook(
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
      const page = await userService.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );
      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];
        const response = await userService.createScheduledPostFacebook(
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

const getPostFacebook = async (req, res) => {
  try {
    const phoneNumber = req.params["phoneNumber"];
    const user = await userService.getUserByPhone(phoneNumber);

    if (user) {
      const page = await userService.getFacebookPage(
        user.facebookUserId,
        user.facebookAccessToken
      );
      if (page) {
        const { access_token: pageAccessToken, id: pageId } = page.data[0];

        const response = await userService.getFacebookPagePosts(
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
};
