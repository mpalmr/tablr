const render = require('./render');

const parseOptions = options => Object.assign({
  data: Array.isArray(options) ? options : [],
  columns: [],
  initialRender: true,
}, options);

function parseElements(elements) {
  if (Array.isArray(elements)) return elements;
  if (elements instanceof NodeList) return Array.from(elements);
  if (elements instanceof Element) return [elements];
  return Array.from(document.querySelectorAll(elements));
}

function tabularData(tableData, columns) {
  if (Array.isArray(tableData[0])) return tableData;
  return tableData
    .map(rowData => columns
      .map(column => rowData[column.id]));
}

const tableColumns = columns => columns.map(column => ({
  label: column.label || column.id,
}));

class Tablr {

  constructor(elements, options = {}) {
    const opts = parseOptions(options);
    this.elements = parseElements(elements);
    this.data = opts.data;
    this.columns = opts.columns;
    if (opts.initialRender) this.render();
  }

  render() {
    const tableData = tabularData(this.data, this.columns);
    const columns = tableColumns(this.columns);
    this.table = render.table(tableData, columns);

    this.elements.forEach(element =>
      element.appendChild(this.table.cloneNode(true)));
  }
}

module.exports = Tablr;
