import axios from "axios";

const Apis = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://d9be-203-130-71-252.jp.ngrok.io",
});
// const BASEURL =
//   "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

// axios.interceptors.request.use(
//   function (config) {
//     // 요청을 보내기 전 수행할 작업
//     const token = localStorage.getItem("access_token");
//     Apis.defaults.headers.common["authorization"] = `${token}`;
//     return config;
//   },
//   function (error) {
//     // 오류 요청 가공
//     return Promise.reject(error);
//   }
// );

//AccessToken이 만료됐을때 처리

// Apis.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (err) {
//     console.log(err);
//     const baseURL =
//       "https://cors-anywhere.herokuapp.com/https://2e44-203-130-71-252.jp.ngrok.io/";
//     const originalConfig = err.config;

//     if (err.response && err.response.status === 401) {
//       const refreshToken = localStorage.getItem("refresh");
//       const accessToken = localStorage.getItem("access_token");
//       console.log(err);
//       console.log(accessToken);
//       console.log(refreshToken);
//       try {
//         console.log(1234);
//         const data = await axios({
//           url: `${baseURL}/token`,
//           method: "GET",
//           headers: {
//             Authorization: accessToken,
//             Refresh: refreshToken,
//             // "ngrok-skip-browser-warning": "111",
//           },
//         });
//         if (data) {
//           console.log(111, data, data.config.headers);
//           const accToken = data.headers.get("Authorization");
//           localStorage.setItem("access_token", accToken);
//           const refToken = data.headers.get("Refresh");
//           localStorage.setItem("refresh", refToken);
//           console.log(accToken, refToken);
//           console.log(originalConfig);
//           originalConfig.headers.authorization = accToken;
//           originalConfig.headers.refresh = refToken;
//           console.log(originalConfig);
//           return await Apis.request(originalConfig);
//           // return 1;
//         }
//       } catch (err) {
//         console.log("토큰 갱신 에러");
//       }
//       return Promise.reject(err);
//     }
//     return Promise.reject(err);
//   }
// );
export default Apis;
