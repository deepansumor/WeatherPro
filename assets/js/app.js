import './routes.js';
await Flxy.translator.load('en');

Flxy.api.configure({
    baseEndpoint: 'https://api.openweathermap.org/data/2.5',
    headers: {},
    middlewares: [function (options) {
        options.query.appid = "948ba3af885728c1dd369e9f253c36ed"
    }]
});

// Flxy.template.setConfig({
//     header: "/header",
//     footer: "/footer"
// });

Flxy.router.handle();

Flxy.events.addListener('.drawer__swipeup', 'click', () => document.querySelector('.drawer').classList.toggle('drawer--fullscreen'));
