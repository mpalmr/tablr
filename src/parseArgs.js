const options = opts => Object.assign({
  data: Array.isArray(opts) ? opts : [],
  columns: [],
  initialRender: true,
}, opts);

function elements(elems) {
  if (Array.isArray(elems)) return elems;
  if (elems instanceof NodeList) return Array.from(elems);
  if (elems instanceof Element) return [elems];
  return Array.from(document.querySelectorAll(elems));
}

module.exports = {
  options,
  elements,
};
