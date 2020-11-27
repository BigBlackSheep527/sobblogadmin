module.exports = {
    devServer: {
        proxy: {
            '/user': {
                target: 'http://192.168.237.128:2021/',
                changeOrigin: true
            },
            '/admin': {
                target: 'http://192.168.237.128:2021/',
                changeOrigin: true
            },
            '/portal': {
                target: 'http://192.168.237.128:2021/',
                changeOrigin: true
            }
        }
    }
};