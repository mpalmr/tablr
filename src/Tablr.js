function parseElements(elements) {
  if (Array.isArray(elements)) return elements;
  if (elements instanceof NodeList) return Array.from(elements);
  if (elements instanceof Element) return [elements];
  return Array.from(document.querySelectorAll(elements))
}

class Tablr {

  constructor(elements, options = {}) {
    this.elements = parseElements(elements);
    this.data = Array.isArray(options) ? options : options.data;
  }
}

module.exports = Tablr;
