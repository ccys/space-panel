const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api/webchat',
        createProxyMiddleware({
            target: 'http://zwbgzh.zhaodaka.vip',
            changeOrigin: true
        })
    );
};