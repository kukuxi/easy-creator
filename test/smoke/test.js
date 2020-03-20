const glob = require('glob-all');

describe('Checking generated file', () => {
    it('Checking HTML', (done) => {
        const files = glob.sync(['./dist/index.html'])
        if (files.length > 0) {
            done()
        } else {
            throw new Error('no html files generated')
        }
    });

    it("Checking JS", (done) => {
        const files = glob.sync([
            './dist/index_*.js',
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no js files generated');
        }
    })

    it("Checking CSS", (done) => {
        const files = glob.sync([
            './dist/index_*.css',
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no css files generated');
        }
    })
})