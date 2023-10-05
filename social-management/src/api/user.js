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

const likeSocialPost = (requestData) =>
  request.post(`users/likeSocialPost`, requestData).then((res) => res.data);

const getFavoritePosts = (phoneNumber) =>
  request.get(`users/getFavoritePosts/${phoneNumber}`).then((res) => res.data);

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
};

export default userApi;
