const Router = require('koa-router');
// const KoaBody = require('koa-body');
const { controllers, WebBeeController } = require('../controller');

const router = new Router();

router
  .get('/mgmt/controllers',
    async (ctx, next) => {
      const ctrlDefinitions = [];
      Object.values(controllers).forEach((controller) => {
        // const controller = entry[1];
        if (controller instanceof WebBeeController) {
          controller.getMethods().forEach((method) => {
            ctrlDefinitions.push(method);
          });
        }
      });
      ctx.body = ctrlDefinitions;
      await next();
    });
  // .get('/users', log('GET users'))
  // .get('/users/:id', log('GET users/:id'))
  // .post('/users/', KoaBody(), log('POST users/'))
  // .put('/users/:id', KoaBody(), log('POST users/:id'))
  // .delete('/users/:id', log('DELETE users/:id'));

module.exports = router.routes();
