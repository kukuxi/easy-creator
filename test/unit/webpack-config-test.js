
const assert = require('assert');

describe('webpack.base.js test case', () => {
    const webpackConfig = require('../../lib/webpack.config.js')

    it('entry', () => {
        assert.equal(webpackConfig.entry.index.indexOf('/test/smoke/template/src/index.js') > -1, true);
    });
});