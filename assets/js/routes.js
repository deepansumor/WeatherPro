/**
 * Main router configuration and weather app initialization
 * @module router
 */
import { formatWeatherData, get, getAll, set, groupWeatherByDate } from "./weather.js";
import { showItemOnCircumference } from "./circleAnimation.js";

const Router = Flxy.router;
const Template = Flxy.template;


Router.register("/home", async function (request) {
    try {
        const cached = getAll();
        // Fetch and format weather data
        const response = !cached.length ? await Flxy.api.get("/forecast", {
            query: {
                lat: 17.4365599,
                lon: 78.4177212
            }
        }) : [];
        // 17.4365599,78.4177212

        request.list = !cached.length ? set(response.list.map((weather,index) => formatWeatherData({ ...weather, city: response.city,index }))) : cached;
        request.weather = get(request.query.dt || null, 0);

        const grouppedData = groupWeatherByDate(request.list);
        request.list = Object.values(grouppedData);

        request.query.dt = request.weather.dt;
        request.list =  request.list.map((listItems) => {
            return listItems.map(item => {
                let isActive = item.dt == request.query.dt ? "capsule--active" : "";
                return {
                    ...item,
                    active: isActive
                }
            })
        });



        // Render template
        await Template.render("/home", request);

      

        showItemOnCircumference(request.weather);

        const activeItem = document.querySelector(".capsule--active");  // Get the active item
        
        // Scroll the active item into view horizontally
        activeItem.scrollIntoView({
            behavior: "instant",  // Smooth scrolling
            block: "nearest",    // Aligns vertically to the nearest position
            inline: "center"    // Scroll horizontally to center the item in the view
        });
        
        let activeDate = activeItem.getAttribute('date');
        document.querySelector(".drawer__item.drawer__item--active").innerHTML = activeDate;
       
    } catch (error) {
        console.error("Error processing /home route:", error);
    }
});