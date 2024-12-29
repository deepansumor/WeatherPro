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

const on404 = () => Flxy.router.navigate("/home")

Flxy.router.handle(on404);

Flxy.events.addListener('.drawer__nav', 'click', () => document.querySelector('.drawer').classList.toggle('drawer--fullscreen'));
