const router = require('koa-router')();

module.exports = app => {
    router.post('/login/getWxAuthInfo', app.controller.login.getWxAuthInfo);

    app.use(router.routes()).use(router.allowedMethods());
};
