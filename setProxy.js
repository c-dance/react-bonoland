const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/user/loginProc',{
            target: "https://bonoland.co.kr",
            changeOrigin: true
        })
    )
}