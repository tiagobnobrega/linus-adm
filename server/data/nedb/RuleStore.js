/**
 * Rule store.
 */

const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/rule.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class RuleStore extends NeDB {
  // overriding validation
  validate(itemsArg) {
    const items = _.castArray(itemsArg);
    items.forEach((e) => {
      assert.notEqual(e.name, '', 'Rule must have a name');
      assert.notEqual(e.botId, '', 'Rule must have a botId');
    });
  }

  // You may create some custom methods here
  findByName(name) {
    return this.find({ name });
  }

  // inserts or update based on _id property
  save(item) {
    if (item._id) {
      return this.update(item);
    }
    return this.insert(item);
  }

  findByBotId(botId) {
    return this.find({ botId });
  }
}

module.exports = new RuleStore(db);
