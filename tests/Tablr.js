import Tablr from '../src/Tablr';

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
      assert.deepEqual(tablr.elements, elements);
    });

    it('array of elements when passed a NodeList', function () {
      const elements = document.querySelectorAll('.table');
      const tablr = new Tablr(elements, []);
      assert.isArray(tablr.elements);
      assert.sameMembers(tablr.elements, Array.from(elements));
    });

    it('wraps a single element into an array', function () {
      const element = document.querySelectorAll('.table')[0];
      const tablr = new Tablr(element, []);
      assert.isArray(tablr.elements);
      assert.strictEqual(tablr.elements[0], element);
      assert.lengthOf(tablr.elements, 1);
    });

    it('uses a string as a query selector', function () {
      const tablr = new Tablr('.table', []);
      assert.isArray(tablr.elements);
      assert.lengthOf(tablr.elements, 3);
      assert.sameMembers(tablr.elements, Array.from(document.querySelectorAll('.table')));
    });
  });

  describe('parses row data', function () {
    const data = [[1, 2], [3, 4]];

    it('uses whole second param if it passed an array', function () {
      const tablr = new Tablr('.table', data);
      assert.deepEqual(tablr.data, data);
    });

    it('uses "data" member of second param if passed an object', function () {
      const tablr = new Tablr('.table', { data });
      assert.deepEqual(tablr.data, data);
    });
  });
});
