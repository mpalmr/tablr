const render = require('./render');

function parseElements(elements) {
  if (Array.isArray(elements)) return elements;
  if (elements instanceof NodeList) return Array.from(elements);
  if (elements instanceof Element) return [elements];
  return Array.from(document.querySelectorAll(elements));
}

class Tablr {

  constructor(elements, options = {}) {
    this.elements = parseElements(elements);
    this.data = Array.isArray(options) ? options : options.data;
  }

  render() {
    this.table = render.table(this.data);
    this.elements.forEach(element => element.appendChild(this.table.cloneNode(true)));
  }
}

module.exports = Tablr;
