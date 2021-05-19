module.exports = {
    apps: [
        {
            name: 'vve-api',
            script: './build/App.js',
            watch: true,
            ignore_watch: ["logs/application.log"],
            max_memory_restart: '250M',
            env: {
                githook: {
                    branch: 'development',
                    command: 'git pull && npm install && npm run build'
                }
            }
        },
    ]
};