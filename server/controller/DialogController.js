const WebBeeController = require('./WebBeeController');
const { DialogStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api');

ctrl.config([
  {
    path: '/dialogs',
    methods: 'GET',
    run: async (ctx) => {
      const { botId } = ctx.request.query;
      if (!botId) throw new Error('botId parameter required');
      const dialogs = await DialogStore.findByBotId(botId);
      ctx.body = { data: dialogs };
      ctx.status = 200;
    },
  },
  {
    path: '/dialogs',
    methods: 'POST,PUT',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await DialogStore.save(docs);
      ctx.body = { data: { count: inserted.length, inserted } };
      ctx.status = 200;
    },
  },
  {
    path: '/dialogs/remove',
    methods: 'POST,PUT,PATCH,DELETE',
    run: async (ctx) => {
      const body = [...ctx.request.body];
      const removed = await DialogStore.remove(body);
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
