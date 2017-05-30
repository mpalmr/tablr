function options(opts) {
  return {
    data: Array.isArray(opts) ? opts : [],
    columns: [],
    initialRender: true,
    ...opts,
    paginate: !opts.paginate ? false : {
      size: [10, 25, 50, 100, 'All'],
      selectedSize: 25,
      selectedPage: 0,
      position: 'bottom',
      textBefore: 'Show',
      textAfter: 'entries',
      ...opts.paginate,
    },
    filter: !opts.filter ? false : {
      rule: (query, row) => row.name.includes(query),
      debounce: 300,
      minQueryLength: 1,
      placeholder: 'Filter...',
      singlePage: false,
      inputValue: '',
      ...opts.filter,
    },
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
