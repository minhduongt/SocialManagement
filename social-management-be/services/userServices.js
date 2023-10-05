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
        twitterAccessToken: "",
        twitterAccessSecret: "",
        twitterApiKey: "",
        twitterApiSecret: "",
        favoritePosts: [],
      };
      await usersRef.doc(phoneNumber).set(newUser);
    }
  } catch (err) {
    console.log("error", err);
  }
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
  getAllUsers,
  getUserByPhone,
  clearAccessCode,
  likeSocialPost,
  getFavoritePosts,
};
