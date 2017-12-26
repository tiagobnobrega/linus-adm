/* eslint no-underscore-dangle: 0 */  // needs this for mongo like _id
/**
 * Base implementation for NeDB Stores. This class implements basic CRUD services.
 * @type {_}
 * @private
 */
const _ = require('lodash');
const { promisify } = require('util');

class NeDBStore {
  constructor(database) {
    this.database = database;
  }

  static validate(docParam) {
    // this method may be overriden to throw Exception
    return !!docParam;
  }

  db() {
    return this.database;
  }

  insert(docs) {
    this.validate(docs);
    console.log('NeDBStore:: returning promise');
    return promisify(this.db().insert.bind(this.db()))(docs);
  }

  updateOne(doc) {
    if (!doc._id) throw new Error("document has no _id field and can't be updated.");
    this.validate(doc);
    // return new Promise((resolve, reject) => this.db()
    //   .update({ _id: doc._id }, doc, {}, handleCallbackAsPromise(resolve, reject)));
    return promisify(this.db().update.bind(this.db()))({ _id: doc._id }, doc, {});
  }

  update(docParam) {
    let docs = docParam;
    if (!_.isArray(docParam)) {
      docs = [docParam];
    }
    const promises = docs.map(d => this.updateOne(d));

    return Promise.all(promises).then(values => values.reduce((a, b) => a + b, 0));
  }

  removeOne(id) {
    if (!id) throw new Error('No id passed for delete.');
    // return new Promise((resolve, reject) => this.db()
    //   .update({ _id: doc._id }, doc, {}, handleCallbackAsPromise(resolve, reject)));
    return promisify(this.db().remove.bind(this.db()))({ _id: id });
    // db.remove(query, options, callback)
  }

  removeQuery(query) {
    return promisify(this.db().remove.bind(this.db()))(query);
  }

  remove(idsParam) {
    let ids = idsParam;
    if (!_.isArray(idsParam)) {
      ids = [idsParam];
    }
    const promises = ids.map(id => this.removeOne(id));
    return Promise.all(promises).then(values => values.reduce((a, b) => a + b, 0));
  }

  find(query) {
    // return new Promise((resolve, reject) => this.db()
    //   .find(query, handleCallbackAsPromise(resolve, reject)));
    return promisify(this.db().find.bind(this.db()))(query);
  }

  findAll() {
    return this.find({});
  }

  findById(id) {
    return this.find({ _id: id });
  }

  compact() {
    this.db().persistence.compactDatafile();
  }
}

module.exports = NeDBStore;
