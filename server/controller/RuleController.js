const WebBeeController = require('./WebBeeController');
const { RuleStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api');

ctrl.config([
  {
    path: '/rules',
    methods: 'GET',
    run: async (ctx) => {
      const { botId } = ctx.request.query;
      if (!botId) throw new Error('botId parameter required');
      const dialogs = await RuleStore.findByBotId(botId);
      ctx.body = { data: dialogs };
      ctx.status = 200;
    },
  },
  {
    path: '/rules',
    methods: 'POST,PUT',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await RuleStore.save(docs);
      ctx.body = { data: { count: inserted.length, inserted } };
      ctx.status = 200;
    },
  },
  {
    path: '/delete-rules',
    methods: 'POST,PUT,PATCH,DELETE',
    run: async (ctx) => {
      const body = [...ctx.request.body];
      const removed = await RuleStore.remove(body);
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
