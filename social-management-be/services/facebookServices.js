const axios = require("axios");
const { usersRef } = require("../config/firebaseConfig");
const { FieldValue } = require("firebase-admin/firestore");

const loginFacebook = async (requestBody) => {
  try {
    const { phoneNumber, accessToken, userId } = requestBody;
    await usersRef.doc(phoneNumber).update({
      facebookAccessToken: accessToken,
      facebookUserId: userId,
    });
  } catch (err) {
    console.log("error", err);
  }
};

const logoutFacebook = async (requestBody) => {
  try {
    const { phoneNumber } = requestBody;
    await usersRef.doc(phoneNumber).update({
      facebookAccessToken: "",
      facebookUserId: "",
    });
  } catch (err) {
    console.log("error", err);
  }
};

const getFacebookPage = async (userId, userAccessToken) => {
  const url = `https://graph.facebook.com/v18.0/${userId}/accounts?access_token=${userAccessToken}`;
  return (await axios.get(url)).data;
};

const getFacebookPagePosts = async (pageId, pageAccessToken) => {
  const url = `https://graph.facebook.com/v18.0/${pageId}/feed?access_token=${pageAccessToken}`;

  return (await axios.get(url)).data;
};

const createPostFacebook = async (pageId, message, pageAccessToken) => {
  const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;
  const requestBody = {
    message: message,
    access_token: pageAccessToken,
  };
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (await axios.post(url, requestBody, axiosConfig)).data;
};

const createScheduledPostFacebook = async (
  pageId,
  message,
  pageAccessToken,
  scheduledTime
) => {
  const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;
  const requestBody = {
    message: message,
    access_token: pageAccessToken,
    published: false,
    scheduled_publish_time: scheduledTime,
  };
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return (await axios.post(url, requestBody, axiosConfig)).data;
};

module.exports = {
  createPostFacebook,
  createScheduledPostFacebook,
  getFacebookPage,
  getFacebookPagePosts,
  loginFacebook,
  logoutFacebook,
};
