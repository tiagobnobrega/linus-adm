/**
 * This file dynamically reads "*Store.js" files and exports them
 */
const requireAll = require('require-all');

const stores = requireAll({
  dirname: `${__dirname}`,
  filter: (filename) => {
    if (filename === 'NeDBStore.js' || filename === 'index.js') {
      return false;
    }
    if (!filename.endsWith('Store.js')) {
      return false;
    }
    return filename.replace('.js', '');
  },
  recursive: true,
});
module.exports = stores;
