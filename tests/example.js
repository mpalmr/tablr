const src = require('../src');

describe('src', function () {
  it('multiples', function () {
    assert.strictEqual(src(3, 2), 6);
  });
});
