const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('easy-creator test', () => {
    require('./unit/webpack-config-test');
})

