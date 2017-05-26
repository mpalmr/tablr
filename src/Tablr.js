import parseArgs from './parseArgs';
import components from './components';

export default class Tablr {

  constructor(elements, options = {}) {
    const opts = parseArgs.options(options);
    this.elements = parseArgs.elements(elements);
    this.data = opts.data;
    this.columns = parseArgs.columns(opts.columns);
    this.paginate = opts.paginate;
    if (opts.initialRender) this.render();
  }

  render() {
    const tableColumns = this.columns.map(column => ({
      label: column.label || column.id,
    }));
    this.table = components.table.table(this.rows(), tableColumns);
    if (this.paginate) this.table.appendChild(components.pagination());
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
