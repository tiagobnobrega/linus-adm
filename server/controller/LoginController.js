const WebBeeController = require('./WebBeeController');
const { DialogStore } = require('../data/nedb');

const ctrl = new WebBeeController('/login');

ctrl.config([
  {
    path: '',
    methods: 'POST',
    run: async (ctx) => {
      const { botId } = ctx.request.query;
      if (!botId) throw new Error('botId parameter required');
      const dialogs = await DialogStore.findByBotId(botId);
      ctx.body = { data: dialogs };
      ctx.status = 200;
    },
  }
]);

module.exports = ctrl;
