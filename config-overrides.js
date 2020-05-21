const { override, addLessLoader, fixBabelImports, addWebpackResolve } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
    }),
    // addWebpackResolve({
    //     modules: ['./', 'node_modules'],
    // })
);