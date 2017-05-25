const parseArgs = require('./parseArgs');
const render = require('./render');

function tabularData(tableData, columns) {
  if (Array.isArray(tableData[0])) return tableData;
  return tableData
    .map(rowData => columns
      .map(column => column.displayValue(rowData[column.id])));
}

const tableColumns = columns => columns.map(column => ({
  label: column.label || column.id,
}));

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
    const tableData = tabularData(this.data, this.columns);
    const columns = tableColumns(this.columns);
    this.table = render.table(tableData, columns);

    this.elements.forEach(element =>
      element.appendChild(this.table.cloneNode(true)));
    return this;
  }
}

module.exports = Tablr;
