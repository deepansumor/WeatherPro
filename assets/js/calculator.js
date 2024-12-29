/**
 * Utilities for calculating sun and moon positions and related angles
 * @module celestialCalculator
 */

/**
 * Converts time string (HH:MM AM/PM) to minutes since midnight
 * @param {string} time - Time in HH:MM AM/PM format
 * @returns {number} Minutes since midnight
 */
function timeToMinutes(time) {
    const [timeStr, period] = time.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
}

/**
 * Gets current time in minutes since midnight
 * @returns {number} Current time in minutes
 */
function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * Calculates the current celestial angle (sun or moon) based on rise and set times
 * @param {string} riseTime - Rise time in HH:MM AM/PM format
 * @param {string} setTime - Set time in HH:MM AM/PM format
 * @param {boolean} isNewDay - Indicates if the set time is on the next calendar day
 * @returns {number} Celestial angle between 0° and 180°
 */
export function calculateAngle(riseTime, setTime, isNewDay = false) {
    const riseMinutes = timeToMinutes(riseTime);
    let setMinutes = timeToMinutes(setTime);

    // Adjust set time if it is on the next calendar day
    if (isNewDay) {
        setMinutes += 24 * 60; // Add 24 hours to set time
    }

    const currentMinutes = getCurrentTimeInMinutes();
    const duration = setMinutes - riseMinutes;
    const elapsed = currentMinutes - riseMinutes;

    // Calculate angle proportionally and clamp between 0° and 180°
    const angle = (elapsed / duration) * 180;
    return Math.min(Math.max(angle, 0), 180);
}

/**
 * Calculates the sun and moon angles based on their rise and set times
 * @param {Object} times - Object containing rise and set times for the sun and moon
 * @param {string} times.sunrise - Sunrise time in HH:MM AM/PM format
 * @param {string} times.sunset - Sunset time in HH:MM AM/PM format
 * @param {string} times.moonrise - Moonrise time in HH:MM AM/PM format
 * @param {string} times.moonset - Moonset time in HH:MM AM/PM format
 * @returns {Object} Angles for the sun and moon
 */
export function calculateCelestialAngles(times) {
    const sunAngle = calculateAngle(times.sunrise, times.sunset);
    const moonAngle = calculateAngle(times.moonrise, times.moonset);

    return {
        sunAngle,
        moonAngle
    };
}
