/**
 * Main router configuration and weather app initialization
 * @module router
 */
import { formatWeatherData, get as getWeather, getAll, set as setWeather, groupWeatherByDate } from "./weather.js";
import { showItemOnCircumference } from "./circleAnimation.js";

const Router = Flxy.router;
const Template = Flxy.template;

async function fetchWeatherData(cached) {
    if (cached.length > 0) return cached;

    try {
        let _location;

        try {
            console.log(`location Date Started`, new Date())
            _location = (await Flxy.location.get());
            //  We will use as Flxy.location.getLatLongFromNavigator 
        } catch (error) {
            console.log(error)
            _location = (await Flxy.location.get());
        }
        console.log(`location Date Ended`, new Date())

        let latitude = _location.latitude;
        let longitude = _location.longitude

        const response = await Flxy.api.get("/forecast", {
            query: {
                lat: latitude,
                lon: longitude
            }
        });

        // Process and cache the response
        const formattedWeatherData = response.list.map((weather, index) => formatWeatherData({ ...weather, city: response.city, index }));
        setWeather(formattedWeatherData);
        return formattedWeatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return [];
    }
}

function groupAndActivateWeatherData(weatherList, activeDt) {
    const groupedData = groupWeatherByDate(weatherList);

    return Object.values(groupedData).map(group =>
        group.map(item => ({
            ...item,
            active: item.dt == activeDt ? "capsule--active" : ""
        }))
    );
}

function scrollToActiveItem() {
    const activeItem = document.querySelector(".capsule--active");
    if (!activeItem) return; // If no active item found, do nothing

    activeItem.scrollIntoView({
        behavior: "instant",  // Smooth scrolling
        block: "nearest",    // Align vertically to the nearest position
        inline: "center"     // Scroll horizontally to center the item in the view
    });
}

function updateDrawer(activeItem) {
    if (!activeItem) return;

    const activeDate = activeItem.getAttribute('date');
    const drawerItem = document.querySelector(".drawer__item.drawer__item--active");
    if (drawerItem) drawerItem.innerHTML = activeDate;
}

Router.register("/home", async function (request) {
    try {
        const cached = getAll();

        // Fetch weather data if not cached
        const weatherData = await fetchWeatherData(cached);
        request.list = weatherData;

        // Get the currently selected weather based on query.dt
        request.weather = getWeather(request.query.dt || null, 0);

        // Group the weather data by date and mark active items
        request.query.dt = request.weather.dt;
        request.list = groupAndActivateWeatherData(request.list, request.query.dt);

        // Render the template
        await Template.render("/home", request, {
            detail: { path: "/forecast" }
        });

        // Show item on circumference
        showItemOnCircumference(request.weather);

        // Scroll the active item into view
        scrollToActiveItem();

        // Update the drawer with the active date
        updateDrawer(document.querySelector(".capsule--active"));

        let attributionSeen = localStorage.getItem("a");
        if (!attributionSeen) {
            document.querySelector(".modal__content").style.display = "block"
            localStorage.setItem("a", Date.now())
        }
    } catch (error) {
        console.error("Error processing /home route:", error);
    }
});
