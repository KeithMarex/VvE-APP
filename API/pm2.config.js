module.exports = {
    apps: [
        {
            name: 'VvE Api',
            script: './build/app.js',
            watch: true,
            max_memory_restart: '250M',
            env: {
                githook: {
                    branch: 'development',
                    command: 'git pull && npm install && tsc'
                }
            }
        },
    ]
};