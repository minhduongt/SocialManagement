const { TwitterApi } = require("twitter-api-v2");
const { usersRef } = require("../config/firebaseConfig");
const { FieldValue } = require("firebase-admin/firestore");

const loginTwitter = async (requestBody) => {
  try {
    const { phoneNumber } = requestBody;
    const twitterClient = {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    };

    await usersRef.doc(phoneNumber).update({
      twitterAccessToken: twitterClient.accessToken ?? "",
      twitterAccessSecret: twitterClient.accessSecret ?? "",
      twitterApiKey: twitterClient.apiKey ?? "",
      twitterApiSecret: twitterClient.apiSecret ?? "",
    });
  } catch (err) {
    console.log("error", err);
  }
};

const logoutTwitter = async (requestBody) => {
  try {
    const { phoneNumber } = requestBody;
    await usersRef.doc(phoneNumber).update({
      twitterAccessToken: "",
      twitterAccessSecret: "",
      twitterApiKey: "",
      twitterApiSecret: "",
    });
  } catch (err) {
    console.log("error", err);
  }
};

const createPostTwitter = async (
  apiKey,
  apiSecret,
  accessToken,
  accessSecret,
  message
) => {
  const twitterClient = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });
  return await twitterClient.v2.tweet(message);
};

const createScheduledPostTwitter = async (
  apiKey,
  apiSecret,
  accessToken,
  accessSecret,
  message
) => {
  const twitterClient = new TwitterApi({
    apiKey: apiKey,
    apiSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });

  const rwClient = twitterClient.readWrite;

  return await rwClient.v2.tweet(message);
};

const getPostTwitter = async (apiKey, apiSecret, accessToken, accessSecret) => {
  const twitterClient = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });

  const twitterUser = await twitterClient.v2.me();

  return await twitterClient.v2.userTimeline(twitterUser.data.id);
};

module.exports = {
  createPostTwitter,
  createScheduledPostTwitter,
  loginTwitter,
  logoutTwitter,
  getPostTwitter,
};
