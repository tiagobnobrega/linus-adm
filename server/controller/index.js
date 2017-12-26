const Router = require('koa-router');
const WebBeeController = require('./WebBeeController');
const KoaBody = require('koa-body');
const requireAll = require('require-all');
// {getId, list, createItem, updateItem, removeItem} = require('../controllers/indexController');

const router = new Router();

const controllers = requireAll({
  dirname: `${__dirname}`,
  filter: (filename) => {
    if (filename === 'WebBeeController.js' || filename === 'index.js') {
      return false;
    }
    return filename.replace('.js', '');
  },
  recursive: true,
});

Object.entries(controllers).forEach((entry) => {
  const name = entry[0];
  const controller = entry[1];
  if (!(controller instanceof WebBeeController)) {
    console.warn(`Module ${name} is not instance of WebBeeController, ignoring...`);
  } else {
    controller.getMethods().forEach((method) => {
      // console.log(`registering controller uri: ${JSON.stringify(method)}`);
      method.httpMethods
        .forEach((httpMethod) => {
        // console.log(`registering controller uri: ${httpMethod}:${method.path} >> ${method.fn}`);
          router[httpMethod](method.path, KoaBody(), method.fn);
        });
    });
  }
});

module.exports = {
  routes() { return router.routes(); },
  allowedMethods() { return router.allowedMethods(); },
  controllers,
  WebBeeController,
};
