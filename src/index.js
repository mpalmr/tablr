const Tablr = require('./Tablr');

const tablr = new Tablr('.table', [['a', 5, 'x'], ['b', 3, 'y']]);
tablr.render();
window.tablr = tablr;

module.exports = Tablr;
