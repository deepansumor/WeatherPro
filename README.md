## **WeatherPro SPA**

A sleek, single-page application (SPA) built using **Flxy.js**, providing real-time weather updates and a 5-day forecast for any location. 

### **Features**
- 🌤 **Current Weather**: Get up-to-date weather information, including temperature, humidity, wind speed, and more.
- 📅 **5-Day Forecast**: View detailed weather forecasts for the next 5 days with intuitive icons and data.
- 🌍 **Search by Location**: Search weather details for any city or use your current location.
- 🎨 **Dynamic Themes**: The app's appearance changes based on the current weather conditions (e.g., sunny, rainy).
- ⚡ **Fast and Lightweight**: Powered by Flxy.js for seamless performance.
- 📱 **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

### **Tech Stack**
- **Flxy.js**: A custom, lightweight framework for building SPAs.
- **HTML/CSS/JavaScript**: For building the UI and handling user interactions.
- **OpenWeatherMap API**: To fetch accurate and real-time weather data.

### **How It Works**
1. Enter the city name in the search bar or use the "Locate Me" button to fetch weather details for your current location.
2. View the current weather summary, including temperature, conditions, and more.
3. Scroll through the 5-day forecast for a detailed weather outlook.

### **Project Structure**
```
weatherpro/
├── index.html         # Main entry point
├── css/
│   └── styles.css     # Styling files
├── js/
│   ├── app.js         # Application logic
│   ├── state.js       # State management using Flxy.js
│   ├── api.js         # API calls and helpers
│   ├── components/
│       ├── weatherCard.js   # Current weather component
│       ├── forecastCard.js  # Forecast card component
├── assets/            # Icons and images
```

### **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/deepansumor/weatherpro-spa.git
   cd weatherpro-spa
   ```
2. Open `index.html` in your browser or use a local development server.

3. Get an API key from [OpenWeatherMap](https://openweathermap.org/api) and update the `api.js` file with your key:
   ```javascript
   const API_KEY = 'your-api-key';
   ```

4. Start exploring the weather in your favorite cities!

### **Roadmap**
- Add support for multiple languages.
- Implement offline mode with cached weather data.
- Provide hourly weather updates.
- Integrate additional features like air quality index.

### **Contributing**
Contributions are welcome! Feel free to fork this repository and create a pull request with your improvements.

### **License**
This project is licensed under the [MIT License](LICENSE).

---