const { createProxyMiddleware } = require("http-proxy-middleware");

const BASEURL = "https://40ba-14-52-189-10.jp.ngrok.io";
module.exports = function (app) {
  app.use(
    ["/v1/questions", "/v1/sign", "/v1/login"],
    createProxyMiddleware({
      target: `${BASEURL}`,
      changeOrigin: true,
    })
  );
};
