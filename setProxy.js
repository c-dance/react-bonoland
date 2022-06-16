const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/user/findEmailProc',{
            target: "https://bonoland.co.kr",
            changeOrigin: true
        })
    )
}