import { request } from "./utils";

const auth = (requestData) =>
  request.post("users/authenticate", requestData).then((res) => res.data);

const validateOTP = (requestData) =>
  request.post("users/validateAccessCode", requestData).then((res) => res.data);
const getUser = (requestData) =>
  request.post("users/getUserByPhone", requestData).then((res) => res.data);

const fbLogin = (requestData) =>
  request.post("users/loginFacebook", requestData).then((res) => res.data);

const fbLogout = (requestData) =>
  request.post("users/signOutFacebook", requestData).then((res) => res.data);

const createPostFacebook = (requestData) =>
  request.post("users/createPostFacebook", requestData).then((res) => res.data);

const createScheduledPostFacebook = (requestData) =>
  request
    .post("users/createScheduledPostFacebook", requestData)
    .then((res) => res.data);

const getPostFacebook = (phoneNumber) =>
  request.get(`users/getPostFacebook/${phoneNumber}`).then((res) => res.data);
const getPostTwitter = (phoneNumber) =>
  request.get(`users/getPostTwitter/${phoneNumber}`).then((res) => res.data);

const likeSocialPost = (requestData) =>
  request.post(`users/likeSocialPost`, requestData).then((res) => res.data);

const getFavoritePosts = (phoneNumber) =>
  request.get(`users/getFavoritePosts/${phoneNumber}`).then((res) => res.data);

const twitterLogin = (requestData) =>
  request.post("users/loginTwitter", requestData).then((res) => res.data);

const twitterLogout = (requestData) =>
  request.post("users/signOutTwitter", requestData).then((res) => res.data);

const createPostTwitter = (requestData) =>
  request.post("users/createPostTwitter", requestData).then((res) => res.data);

const createScheduledPostTwitter = (requestData) =>
  request
    .post("users/createScheduledPostTwitter", requestData)
    .then((res) => res.data);

const userApi = {
  auth,
  validateOTP,
  fbLogin,
  fbLogout,
  getUser,
  createPostFacebook,
  getPostFacebook,
  createScheduledPostFacebook,
  likeSocialPost,
  getFavoritePosts,
  twitterLogin,
  twitterLogout,
  createPostTwitter,
  createScheduledPostTwitter,
  getPostTwitter,
};

export default userApi;
