function options(opts) {
  return {
    data: Array.isArray(opts) ? opts : [],
    columns: [],
    initialRender: true,
    paginate: false,
    ...opts,
  };
}

function elements(elems) {
  if (Array.isArray(elems)) return elems;
  if (elems instanceof NodeList) return Array.from(elems);
  if (elems instanceof Element) return [elems];
  return Array.from(document.querySelectorAll(elems));
}

function columns(cols) {
  return cols.map(col => ({
    displayValue: value => value,
    ...col,
  }));
}

export default {
  options,
  elements,
  columns,
};
