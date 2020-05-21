const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/admin/product',
        createProxyMiddleware({
            target: 'http://space.zhaodaka.vip',
            changeOrigin: true
        })
    );
};