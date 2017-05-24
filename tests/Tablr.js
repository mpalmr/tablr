const Tablr = require('../src/Tablr');

describe('Tablr', function () {

  describe('parses elements', function () {

    beforeEach(function () {
      for (let i = 0; i < 3; i++) {
        const element = document.createElement('div');
        element.classList.add('table');
        document.body.appendChild(element);
      }
    });

    afterEach(function () {
      document.querySelectorAll('.table').forEach(element => element.remove());
    });

    it('unchanged when passed an array', function () {
      const elements = Array.from(document.querySelectorAll('.table'));
      const tablr = new Tablr(elements, []);
      assert.deepEqual(elements, tablr.elements);
    });

    it('array of elements when passed a NodeList', function () {
      const elements = document.querySelectorAll('.table');
      const tablr = new Tablr(elements, []);
      assert.isArray(tablr.elements);
      assert.sameMembers(Array.from(elements), tablr.elements);
    });

    it('wraps a single element into an array', function () {
      const element = document.querySelectorAll('.table')[0];
      const tablr = new Tablr(element, []);
      assert.isArray(tablr.elements);
      assert.strictEqual(element, tablr.elements[0]);
      assert.lengthOf(tablr.elements, 1);
    });

    it('uses a string as a query selector', function () {
      const tablr = new Tablr('.table', []);
      assert.isArray(tablr.elements);
      assert.lengthOf(tablr.elements, 3);
      assert.sameMembers(Array.from(document.querySelectorAll('.table')), tablr.elements);
    });
  });
});
