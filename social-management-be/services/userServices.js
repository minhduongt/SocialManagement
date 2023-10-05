const { default: axios } = require("axios");
const { usersRef } = require("../config/firebaseConfig");
const { FieldValue } = require("firebase-admin/firestore");

const getAllUsers = async () => {
  try {
    let listUser = [];
    const snapshot = await usersRef.get();
    listUser = snapshot.docs.map((doc) => doc.data());

    return listUser;
  } catch (err) {
    console.log("error", err);
  }
};

const getUserByPhone = async (phoneNumber) => {
  try {
    const user = (await usersRef.doc(phoneNumber).get()).data();
    return user;
  } catch (err) {
    console.log("error", err);
  }
};

const clearAccessCode = async (phoneNumber) => {
  try {
    const res = await usersRef.doc(phoneNumber).update({ accessCode: "" });
    console.log("clear code", res);
  } catch (err) {
    console.log("error", err);
  }
};
const createUser = async (requestBody) => {
  try {
    const { phoneNumber } = requestBody;
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const foundUser = await getUserByPhone(phoneNumber);
    if (foundUser) {
      const updatedUser = {
        accessCode: otpCode.toString(),
      };
      await usersRef.doc(phoneNumber).update(updatedUser);
    } else {
      const newUser = {
        phoneNumber: phoneNumber,
        accessCode: otpCode.toString(),
        facebookAccessToken: "",
        facebookUserId: "",
        favoritePosts: [],
      };
      await usersRef.doc(phoneNumber).set(newUser);
    }
  } catch (err) {
    console.log("error", err);
  }
};

const updateUser = async () => {};

const deleteUser = async () => {};

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

const likeSocialPost = async (requestBody) => {
  try {
    const { phoneNumber, postId } = requestBody;
    const favoritePosts = (await usersRef.doc(phoneNumber).get()).data()
      .favoritePosts;
    if (favoritePosts.findIndex((e) => e === postId) > -1) {
      await usersRef.doc(phoneNumber).update({
        favoritePosts: FieldValue.arrayRemove(postId),
      });
    } else {
      await usersRef.doc(phoneNumber).update({
        favoritePosts: FieldValue.arrayUnion(postId),
      });
    }
  } catch (err) {
    console.log("error", err);
  }
};

const getFavoritePosts = async (phoneNumber) => {
  try {
    const user = (await usersRef.doc(phoneNumber).get()).data();
    return user.favoritePosts;
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByPhone,
  updateUser,
  clearAccessCode,
  loginFacebook,
  logoutFacebook,
  getFacebookPage,
  createPostFacebook,
  createScheduledPostFacebook,
  getFacebookPagePosts,
  likeSocialPost,
  getFavoritePosts,
};
