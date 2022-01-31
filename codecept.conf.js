const { setHeadlessWhen } = require('@codeceptjs/configure')

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS)

exports.config = {
    tests: 'e2e/**/*.spec.js',
    output: 'e2e/outputs',
    helpers: {
        Puppeteer: {
            url: ' http://localhost:8080',
            show: true,
            windowSize: '1200x900',
            waitForTimeout: 5000
        }
    },
    include: {
        I: './steps_file.js'
    },
    bootstrap: null,
    mocha: {},
    name: 'movie-catalogue',
    plugins: {
        pauseOnFail: {},
        retryFailedStep: {
            enabled: true
        },
        tryTo: {
            enabled: true
        },
        screenshotOnFail: {
            enabled: true
        }
    }
}
