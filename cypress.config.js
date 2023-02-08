const {defineConfig} = require("cypress");

module.exports = defineConfig({
    projectId: "j6h33q",
    e2e: {
        baseUrl: 'https://discuss.flarum.org/',
    },
});
