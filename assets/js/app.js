// Ensure Flxy is initialized
let Flxy = window.Flxy || {};

import './routes.js';

// Set the base URL based on the environment (HTTPS or HTTP)
const baseURL = location.origin.startsWith("https") ? `${location.origin}/WeatherPro` : location.origin;
console.log(`Base URL: ${baseURL}`);

// Configure Flxy's template and translator prefixes
Flxy.template.setPrefix(`${baseURL}/templates`);
Flxy.translator.setPrefix(`${baseURL}/translations`);

// Load the English language translations
await Flxy.translator.load('en');

// Configure the API settings for OpenWeatherMap
Flxy.api.configure({
    baseEndpoint: 'https://api.openweathermap.org/data/2.5',
    headers: {},
    middlewares: [
        function (options) {
            // Add API key to query parameters
            options.query.appid = "948ba3af885728c1dd369e9f253c36ed";
        }
    ]
});

// Configure default asset URL for Flxy templates
Flxy.template.setConfig({
    defaults: {
        assetURL: `${baseURL}/assets`
    }
});

// Handle 404 errors and redirect to home
const on404 = (data) => {
    if (data.status === 404) {
        Flxy.router.navigate("/home");
    }
};

// Set up 404 error handler for Flxy router
Flxy.router.handle(on404);

// Toggle drawer fullscreen mode when navigation item is clicked
Flxy.events.addListener('.drawer__nav', 'click', () => {
    document.querySelector('.drawer').classList.toggle('drawer--fullscreen');
});

// Hide modal content when specified events occur
const hideModal = () => {
    const modalContent = document.querySelector(".modal__content");
    if (modalContent) {
        modalContent.style.display = "none";
    }
};

// Add event listeners to hide the modal on click, touch, or scroll
["click", "touch", "scroll"].forEach(event => {
    document.addEventListener(event, hideModal);
});
