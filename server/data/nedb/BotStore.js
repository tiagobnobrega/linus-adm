/**
 * Bots store.
 */

const Datastore = require('nedb');
const _ = require('lodash');
const assert = require('assert');
const NeDB = require('./NeDBStore');
const path = require('path');

const DATAFILE_PATH = './db/bots.dat';
const db = new Datastore({ filename: path.resolve(__dirname, DATAFILE_PATH), autoload: true });

class BotStore extends NeDB {
  // overriding validation
  validate(itemsArg) {
    const items = _.castArray(itemsArg);
    items.forEach((e) => {
      assert.notEqual(e.name, '', 'Bot must have a name');
      assert.notEqual(e.description, '', 'bots must have a description');
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

}

module.exports = new BotStore(db);
