var path = require('path');

module.exports = {
    entry: {
    	index: './index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react']
            }
        }]
    },
    resolve: {
    	extensions: ['', '.jsx', '.js']
    }
}
