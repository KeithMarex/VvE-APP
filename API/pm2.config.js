module.exports = {
    apps: [
        {
            name: 'VvE Api',
            script: './build/app.js',
            watch: true,
            env: {
                githook: {
                    command: 'git pull && npm install && tsc'
                }

        }
        },
    ]
};