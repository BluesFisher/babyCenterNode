const koa2Req = require('koa2-request');
const WxAppId = 'wx4ca43a4bd45566da';
const WxAppSecret = 'ca702aa60a55f173db44c4df1060ce01';

module.exports = {
    getWxAuthInfo: async (ctx, next) => {
        let { code } = ctx.request.body;
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WxAppId}&secret=${WxAppSecret}&js_code=${code || ''}&grant_type=authorization_code`;

        const result = await koa2Req(url);

        const data = JSON.parse(result.body || '{}');

        let { openid, session_key, unionid } = data;
        if (result.statusCode === 200) {
            let wxUserinfo = ctx.session['wxUserinfo'] || {};
            ctx.session['wxUserinfo'] = {
                ...wxUserinfo,
                openid,
                session_key,
                unionid
            };
        }
        console.log('getWxAuthInfo_request', openid, session_key, unionid);

        ctx.send({
            retcode: 0,
            data,
            retmsg: ''
        });
    }
};
