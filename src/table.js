const tbody = data => data.reduce((element, row) => {
  const tr = document.createElement('tr');
  tr.appendChild(row.reduce((cell, value) => {
    cell.appendChild(document.createTextNode(value));
    return cell;
  }, document.createElement('td')));
  element.appendChild(tr);
  return element;
}, document.createElement('tbody'));

function table(data) {
  const element = document.createElement('table');
  element.appendChild(tbody(data));
  return element;
}

module.exports = table;
