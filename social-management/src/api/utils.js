import axios from "axios";

// ----------------------------------------------------------------------

const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray =
      isParamTypeObject &&
      Array.isArray(params[key]) &&
      params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  paramsSerializer: parseParams,
});

request.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error.response && error.response.data
      // || "Có lỗi xảy ra"
    )
);

export { request };
