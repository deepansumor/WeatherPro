// Configuration constants for unit conversions and formatting.
const CONFIG = {
    temperature: {
        unit: "°", // Temperature unit
        kelvinOffset: 273.15, // Conversion offset from Kelvin to Celsius
        precision: 2 // Decimal precision
    },
    visibility: {
        unit: "km", // Visibility unit
        conversionFactor: 1000, // Convert meters to kilometers
        precision: 2 // Decimal precision
    },
    wind: {
        speedUnit: "km/h", // Wind speed unit
        speedConversionFactor: 3.6, // Conversion factor from m/s to km/h
        directionUnit: "°" // Wind direction unit
    },
    pressure: {
        unit: "hPa" // Atmospheric pressure unit
    },
    time: {
        format: "12-hour" // Time format ('12-hour' or '24-hour')
    },
    humidity: {
        unit: "%" // Humidity unit
    },
    clouds: {
        unit: "%" // Cloud coverage unit
    }
};
const _weathers = [];
/**
 * Converts raw weather data into human-readable values.
 * @param {Object} weatherData - The raw weather data.
 * @returns {Object} The human-readable weather data.
 */
function formatWeatherData(weatherData) {
    // Helper function to convert Kelvin to Celsius
    const kelvinToCelsius = (temp) =>
        (temp - CONFIG.temperature.kelvinOffset).toFixed(CONFIG.temperature.precision) + ` ${CONFIG.temperature.unit}`;

    // Helper function to convert UNIX timestamp to formatted time
    const unixToTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        if (CONFIG.time.format === "12-hour") {
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Convert to 12-hour format
            return `${hours}:${minutes} ${ampm}`;
        }
        return `${hours.toString().padStart(2, "0")}:${minutes}`; // 24-hour format
    };

    // Prepare timings for sunrise, sunset, and calculate night start and end
    const sunrise = weatherData.city.sunrise;
    const sunset = weatherData.city.sunset;
    const nightStartTime = sunset;
    const nightEndTime = sunrise;

    // Calculate moonrise and moonset relative to sunset and sunrise
    const moonriseTime = nightStartTime - 2 * 3600; // 2 hours before sunset
    const moonsetTime = nightEndTime + 2 * 3600; // 2 hours after sunrise

    // Use `dt` to determine if it is day or night
    const isNight = String(weatherData.weather[0].icon).endsWith("n");
    const isDay = !isNight;

    // Prepare formatted timings
    const timings = {
        sun: {
            sunrise: unixToTime(sunrise),
            sunset: unixToTime(sunset)
        },
        night: {
            start: unixToTime(nightStartTime),
            end: unixToTime(nightEndTime)
        },
        moon: {
            rise: unixToTime(moonriseTime),
            set: unixToTime(moonsetTime)
        },
    };

    const { sunrise: formattedSunrise, sunset: formattedSunset } = timings.sun;
    const { start: moonrise, end: moonset } = timings.night;

    // Processed weather data
    return {
        dt: weatherData.dt,
        location: {
            city: weatherData.city.name,
            country: weatherData.city.country
        },
        weather: {
            condition: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            id: weatherData.weather[0].icon,
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        },
        temperature: {
            current: kelvinToCelsius(weatherData.main.temp),
            feelsLike: kelvinToCelsius(weatherData.main.feels_like),
            minimum: kelvinToCelsius(weatherData.main.temp_min),
            maximum: kelvinToCelsius(weatherData.main.temp_max)
        },
        part: isDay ? 'sun' : 'moon',
        pressure: `${weatherData.main.pressure} ${CONFIG.pressure.unit}`,
        humidity: `${weatherData.main.humidity}${CONFIG.humidity.unit}`,
        wind: {
            speed: `${(weatherData.wind.speed * CONFIG.wind.speedConversionFactor).toFixed(2)} ${CONFIG.wind.speedUnit}`,
            direction: `${weatherData.wind.deg}${CONFIG.wind.directionUnit}`
        },
        visibility: `${(weatherData.visibility / CONFIG.visibility.conversionFactor).toFixed(2)} ${CONFIG.visibility.unit}`,
        clouds: `${weatherData.clouds.all}${CONFIG.clouds.unit}`,
        isDay,
        isNight,
        timezone: `${(weatherData.city.timezone / 3600).toFixed(1)} hours from UTC`,
        metadata: {
            timestamp: unixToTime(weatherData.dt),
            source: weatherData.base || "Unknown",
        },
        ...timings,
        rise: isDay ? formattedSunrise : moonrise,
        set: isDay ? formattedSunset : moonset,
        dt_txt:weatherData.dt_txt,
        index:weatherData.index

    };
}

function formatDateToCustomFormat(dateString) {
    const date = new Date(dateString);
    
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    // Format the date
    let formattedDate = date.toLocaleString('en-GB', options);
    formattedDate = formattedDate.replace(/am|pm/i, (match) => match.toUpperCase());

    // Return in required format: 29 Dec, Sunday 2024 12:00 AM
    return formattedDate.replace(',', ''); // Remove the comma after the day
}


/**
 * Groups weather objects into arrays based on their date.
 * @param {Array} weatherDataArray - Array of weather objects.
 * @returns {Array} - Array of arrays grouped by date.
 */
function groupWeatherByDate(weatherDataArray) {
    // Helper function to extract date from a timestamp
    const getDateFromTimestampArr = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toISOString().split("T"); // Format: YYYY-MM-DD
    };

    // Object to hold grouped data
    const groupedData = {};

    // Iterate over each weather object and group by date
    weatherDataArray.forEach((weather) => {
        const date = getDateFromTimestampArr(weather.dt);
        if (!groupedData[date[0]]) {
            groupedData[date[0]] = [];
        }

        let time = date[1].split(":");
        weather.time = time.slice(0, time.length - 1).join(":");
        weather.date = date[0];
        weather.formattedDate = formatDateToCustomFormat(weather.dt_txt)
        groupedData[date[0]].push(weather);
    });

    return groupedData;
}

function set(weathers) {
    _weathers.push(...weathers);
    return _weathers;
}

function get(dt, index) {
    return dt ? _weathers.find(weather => weather.dt == dt) : _weathers[index];
}

function getAll() {
    return _weathers;
}
export { formatWeatherData, CONFIG, get, set, getAll, groupWeatherByDate };
