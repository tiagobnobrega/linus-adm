const WebBeeController = require('./WebBeeController');

const ctrl = new WebBeeController('/health');

ctrl.config([
  {
    path: '',
    methods: 'GET',
    run: async (ctx) => {
      ctx.body = { status: 'ok' };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
