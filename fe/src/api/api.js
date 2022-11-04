import axios from "axios";

const Apis = axios.create({
  baseURL: "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com",
});
// const BASEURL =
//   "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

Apis.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.log(11);
    config.headers["accessToken"] = null;
    config.headers["refreshToken"] = null;
    return config;
  }
  if (config.headers && token) {
    console.log(222);
    let jwtToken = config.headers.get("Authorization");
    let jwtrefreshToken = config.headers.get("refresh");
    config.headers["authorization"] = `${jwtToken}`;
    config.headers["refresh"] = `${jwtrefreshToken}`;
    return config;
  }
});

//AccessToken이 만료됐을때 처리
Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      const refreshToken = originalConfig.headers["refreshToken"];
      try {
        const data = await axios({
          url: `refreshtoken담아 보낼 URL`,
          method: "GET",
          headers: {
            Authorization: refreshToken,
          },
        });
        if (data) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.data, ["accessToken", "refreshToken"])
          );
          return await Apis.request(originalConfig);
        }
      } catch (err) {
        console.log("토큰 갱신 에러");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);
export default Apis;
