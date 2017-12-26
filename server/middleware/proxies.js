const ENV = require('../config/ENV');
const Router = require('koa-router');
// const httpProxyMiddleware = require('http-proxy-middleware');

const routeMiddleware = middleware => (path) => {
  const middlewareRouter = new Router();
  middlewareRouter.all(path, middleware);
  return middlewareRouter.routes();
};


// Instanciar proxy para log de controller
const Logger = routeMiddleware(async (ctx, next) => {
  console.log('ctx:', ctx);
  await next();
});

// Instanciar proxy para api
// // TODO CHANGE TO COMPLY WITH KOA2
// const ApiProxy = httpProxyMiddleware('/api/**', {
//   target: ENV.API_BASE_URL,
//   proxyTimeout: ENV.PROXY_TIMEOUT,
//   pathRewrite(path) {
//     // let p = path;
//     const p = path.replace('/api', '');
//     console.log(`ENV.API_BASE_URL=${ENV.API_BASE_URL}`);
//     console.log(`redirecting: ${path}>>${ENV.API_BASE_URL}${p}`);
//     return `/service${p}`;
//   },
//   onProxyReq(/* proxyReq, req */) {
//     console.log('ON PROXY...');
//   },
// });

const ApiAuth = routeMiddleware(async (ctx, next) => {
  const authKey = ctx.request.header.authorization;
  if (!authKey || authKey !== ENV.APP_SECRET) {
    const message = 'Authorization key invalid or undefined';
    ctx.body = { status: 401, message };
    ctx.status = 401;
  } else {
    await next();
  }
});

module.exports = { ApiAuth, Logger };
