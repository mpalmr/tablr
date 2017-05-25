const parseArgs = require('./parseArgs');
const render = require('./render');

class Tablr {

  constructor(elements, options = {}) {
    const opts = parseArgs.options(options);
    this.elements = parseArgs.elements(elements);
    this.data = opts.data;
    this.columns = parseArgs.columns(opts.columns);
    this.sortBy = opts.sortBy;
    if (opts.initialRender) this.render();
  }

  render() {
    const tableColumns = this.columns.map(column => ({
      label: column.label || column.id,
    }));
    this.table = render.table(this.rows(), tableColumns);
    this.elements.forEach(element =>
      element.appendChild(this.table.cloneNode(true)));
    return this;
  }

  rows() {
    return this.data
      .map(row => (Array.isArray(row) ? row : this.columns
        .map(column => column.displayValue(row[column.id]))))
      .sort(typeof this.sortBy === 'function' ? this.sortBy : this.sortBy.sort);
  }
}

module.exports = Tablr;
