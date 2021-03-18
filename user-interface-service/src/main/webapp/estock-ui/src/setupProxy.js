const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/customer/validateLogin',
        createProxyMiddleware({
            target: 'http://localhost:8762/',
            changeOrigin: true,
        })
    );
    app.use(
        '/customer/registerCustomer',
        createProxyMiddleware({
            target: 'http://localhost:8762/',
            changeOrigin: true,
        })
    );

};