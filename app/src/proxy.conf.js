const PROXY_CONFIG = [
    {
        context: [
            '/api'
        ],
        target: 'http://localhost:3030',
        secure: false
    }
];

module.exports = PROXY_CONFIG;