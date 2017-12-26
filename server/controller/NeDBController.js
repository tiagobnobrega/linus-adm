const WebBeeController = require('./WebBeeController');
const neDbStores = require('../data/nedb');


const connectStoreMethods = (controller, stores) => {
  const appendStore = (store, basePath) => {
    controller
      // Find by query
      .use('POST', `${basePath}/find`)(async (ctx) => {
        const query = ctx.request.body;
        const docs = await store.find(query);
        ctx.body = { data: docs };
        ctx.status = 200;
      })
      // Find all
      .use('GET', `${basePath}/findAll`)(async (ctx) => {
        const docs = await store.findAll();
        ctx.body = { data: docs };
      })
      // insert
      .use('POST', `${basePath}/insert`)(async (ctx) => {
        const docs = ctx.request.body;
        const inserted = await store.insert(docs);
        ctx.body = { data: { count: inserted.length, inserted } };
      })
      .use('POST', `${basePath}/update`)(async (ctx) => {
        const docs = ctx.request.body;
        const numDocs = await store.update(docs);
        ctx.body = { data: { count: numDocs } };
      })
      .use('POST', `${basePath}/remove`)(async (ctx) => {
        const ids = ctx.request.body;
        const numDocs = await store.remove(ids);
        ctx.body = { data: { count: numDocs } };
      })
      // Compact DB
      .use('GET', `${basePath}/compact`)(async (ctx) => {
        store.compact();
        ctx.body = { status: 'ok' };
      });
  };

  Object.entries(stores).forEach((entry) => {
    appendStore(entry[1], entry[0].toLowerCase());
  });
};

const dbController = new WebBeeController('/nedb');
connectStoreMethods(dbController, neDbStores);
// module.exports = dbController;
// module.exports = {};
