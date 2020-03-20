const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

process.chdir(path.join(__dirname, './template'));

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod');
    webpack(prodConfig, (err, result) => {
        if (err) {
            console.log("err", err);
            process.exit(2);
        }
        console.log(result.toString({
            color: true,
            modules: false,
            children: false
        }))


        mocha.addFile(path.join(__dirname, 'test.js'))
        mocha.run()
    })
})