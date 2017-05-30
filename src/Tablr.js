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
    // Container
    const containerElement = document.createElement('div');
    containerElement.classList.add('tablr-container');

    // Table
    const tableColumns = this.columns.map(column => ({
      label: column.label || column.id,
    }));
    const table = components.table.table(this.rows(), tableColumns);
    containerElement.appendChild(table);

    // Pagination
    if (this.paginate) {
      const controls = components.pagination(this.paginate);
      if (this.paginate.position === 'bottom') containerElement.appendChild(controls);
      else containerElement.insertBefore(controls, table);
    }

    // Add to DOM
    this.elements.forEach(element =>
      element.appendChild(containerElement.cloneNode(true)));

    return this;
  }

  rows() {
    return this.data
      .map(row => (Array.isArray(row) ? row : this.columns
        .map(column => column.displayValue(row[column.id]))));
  }
}
