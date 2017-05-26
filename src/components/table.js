const cell = (cellValue) => {
  const td = document.createElement('td');
  td.appendChild(document.createTextNode(cellValue));
  return td;
};

const row = rowData => rowData.reduce((tr, value) => {
  tr.appendChild(cell(value));
  return tr;
}, document.createElement('tr'));

const body = data => data.reduce((tbody, rowData) => {
  tbody.appendChild(row(rowData));
  return tbody;
}, document.createElement('tbody'));

const columnHeading = (column) => {
  const th = document.createElement('th');
  th.appendChild(document.createTextNode(column.label));
  th.addEventListener('click', column.onClick);
  return th;
};

const head = columns => columns.reduce((thead, column) => {
  thead.appendChild(columnHeading(column));
  return thead;
}, document.createElement('thead'));

const table = (data, columns) => {
  const element = document.createElement('table');
  if (columns && columns.length) element.appendChild(head(columns));
  element.appendChild(body(data));
  return element;
};

export default {
  table,
  head,
  columnHeading,
  body,
  row,
  cell,
};
