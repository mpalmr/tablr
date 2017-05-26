import parseArgs from './parseArgs';
import render from './render';

export default class Tablr {

  constructor(elements, options = {}) {
    const opts = parseArgs.options(options);
    this.elements = parseArgs.elements(elements);
    this.data = opts.data;
    this.columns = parseArgs.columns(opts.columns);
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
        .map(column => column.displayValue(row[column.id]))));
  }
}
