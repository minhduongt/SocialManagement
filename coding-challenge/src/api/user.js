import { request } from "./utils";

export const auth = (params) =>
  request.get("/authenticate", { params }).then((res) => res.data);

const userApi = {
  auth,
};

export default userApi;
