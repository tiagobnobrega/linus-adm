// Basic imports
const ENV = require('./config/ENV');
const path = require('path');
const chalk = require('chalk');
// Server imports

const http = require('http');
const Koa = require('koa');
// Middlewares
const err = require('./middleware/error');
const serve = require('koa-static');
const historyFallback = require('./middleware/history-fallback');
const mgmt = require('./middleware/mgmt');
const { routes, allowedMethods } = require('./controller');
// const { ApiAuth } = require('./middleware/proxies');

const app = new Koa();
// define public static dir
const publicDir = path.join(__dirname, ENV.PUBLIC_DIR);

// Error middleware
app.use(err);
// use Auth middlewre
// app.use(ApiAuth('/api/*'));
// load routes
app.use(routes());
// define routes allowedMethods
app.use(allowedMethods());
// load mgmt routes
app.use(mgmt);
// serve static content
app.use(serve(publicDir));
// use history-api-fallback
app.use(historyFallback());


// Start server
http.createServer(app.callback()).listen(ENV.PORT, () => {
  console.log(chalk.green(`${ENV.name} listening at port ${ENV.PORT}`));
});
