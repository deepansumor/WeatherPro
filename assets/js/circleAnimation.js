
import { calculateAngle } from "./calculator.js";


/**
 * Handles the semi-circle animation and positioning
 * @module circleAnimation
 */

/**
 * Calculates position of an item on a semicircle's circumference
 * @param {number} angle - Angle in degrees (0-180)
 * @param {number} radius - Radius of the semicircle
 * @param {number} centerX - X coordinate of the center
 * @param {number} centerY - Y coordinate of the center
 * @returns {Object} x and y coordinates
 */
export function calculateCircumferencePosition(angle, radius, centerX, centerY) {
    angle = angle >= 180 ? 179 : angle;
    const radians = (angle % 180) * (Math.PI / 180);
    return {
        x: centerX + radius * Math.cos(radians),
        y: centerY - radius * Math.sin(radians)
    };
}

/**
 * Sets up the semicircle dimensions and styling
 * @param {HTMLElement} element - The semicircle container element
 * @returns {Object} Calculated dimensions
 */
export function setupSemicircle(element) {
    const width = element.offsetWidth - 40;
    const height = width / 2;
    const borderWidth = 2;
    const borderRadius = height + borderWidth;

    // Set CSS custom properties
    element.style.setProperty('--circle-width', `${width}px`);
    element.style.setProperty('--circle-border', `${borderRadius}px`);
    element.style.setProperty('--circle-border-width', `${borderWidth}px`);

    return { width, height, borderWidth, borderRadius };
}


 export async function showItemOnCircumference(weather) {

    // Calculate sun position
    const { sunrise, sunset } = weather.sun;
    const { start: moonrise, end: moonset } = weather.night;
    const { isDay } = weather;

    // Setup semicircle animation
    const semicircleElem = document.querySelector(".half-circle");
    const movingItem = document.querySelector('.circle-border-item');
    const { height } = setupSemicircle(semicircleElem);



    const sunAngle = calculateAngle(sunrise, sunset);
    const moonAngle = calculateAngle(moonrise, moonset, true);
    const angle = isDay ? sunAngle : moonAngle;

    // Position the sun indicator
    const { x, y } = calculateCircumferencePosition(
        angle,
        height,
        height - 15,
        height - 18
    );

    // Update moving item position
    movingItem.style.right = `${x - 10}px`;
    movingItem.style.top = `${y - 10}px`;
}