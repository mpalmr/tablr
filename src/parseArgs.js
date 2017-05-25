function options(opts) {
  function sortBy() {
    if (typeof opts.sortBy === 'function') return opts.sortBy;
    if (!opts.sortBy) {
      if (!Array.isArray(opts.columns) && !opts.columns.length) {
        if (typeof opts.columns[0].sortBy === 'function') return opts.columns[0].sortBy;
        return opts.columns[0];
      }
    }
    return (a, b) => a - b;
  }

  return Object.assign({
    data: Array.isArray(opts) ? opts : [],
    columns: [],
    sortBy: sortBy(),
    initialRender: true,
  }, opts);
}

function elements(elems) {
  if (Array.isArray(elems)) return elems;
  if (elems instanceof NodeList) return Array.from(elems);
  if (elems instanceof Element) return [elems];
  return Array.from(document.querySelectorAll(elems));
}

const columns = cols => cols.map((col) => {
  function sort(a, b) {
    if (typeof a === 'string') return a.localeCompare(b);
    return a - b;
  }

  return Object.assign({
    sort,
    displayValue: value => value,
  }, col);
});

module.exports = {
  options,
  elements,
  columns,
};
