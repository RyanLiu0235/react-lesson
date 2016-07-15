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
                presets: ['react', 'es2015']
            }
        },{
            test: /\.less$/,
            loader: 'style!css!less'
        },{
            test: /\.(jpeg?|png|gif)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    resolve: {
    	extensions: ['', '.jsx', '.js', '.less', '.jpg', '.jpeg', '.png', '.gif']
    }
}
