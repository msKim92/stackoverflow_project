const { createProxyMiddleware } = require("http-proxy-middleware");

const BASEURL = "https://a982-203-130-71-252.jp.ngrok.io";
module.exports = function (app) {
  app.use(
    ["/v1/questions", "/v1/sign", "/v1/login", "/v1/answer"],
    createProxyMiddleware({
      target: `${BASEURL}`,
      changeOrigin: true,
    })
  );
};
