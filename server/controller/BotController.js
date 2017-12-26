const WebBeeController = require('./WebBeeController');
const { BotStore } = require('../data/nedb');

const ctrl = new WebBeeController('/api');

ctrl.config([
  {
    path: '/bot',
    methods: 'GET',
    run: async (ctx) => {
      const bots = await BotStore.findAll();
      ctx.body = { data: bots };
      ctx.status = 200;
    },
  },
  {
    path: '/bot',
    methods: 'POST,PUT',
    run: async (ctx) => {
      const docs = ctx.request.body;
      const inserted = await BotStore.save(docs);
      ctx.body = { data: { count: inserted.length, inserted } };
      ctx.status = 200;
    },
  },
  {
    path: '/delete-bot',
    methods: 'POST,PUT,PATCH,DELETE',
    run: async (ctx) => {
      const body = [...ctx.request.body];
      const removed = await BotStore.remove(body.map(e => e._id));
      ctx.body = { data: { count: removed } };
      ctx.status = 200;
    },
  },
]);

module.exports = ctrl;
