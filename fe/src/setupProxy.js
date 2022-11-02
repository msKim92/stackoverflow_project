const { createProxyMiddleware } = require("http-proxy-middleware");

const BASEURL = "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com";

module.exports = function (app) {
  app.use(
    ["/v1/questions", "/v1/sign", "/v1/login", "/v1/answer"],
    createProxyMiddleware({
      target: `${BASEURL}`,
      changeOrigin: true,
    })
  );
};
