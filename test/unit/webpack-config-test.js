const assert = require('assert');

discribe("test webpack-config", () => {
    const webpackConfig = require('../../lib/webpack.config');

    it('entry', () => {
        assert.equal(webpackConfig.entry.index)
    })
})