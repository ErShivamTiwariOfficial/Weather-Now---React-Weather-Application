# Weather Now - React Weather Application

## Overview

Weather Now is a responsive, interactive weather web application built with React. It enables users to:

- Search weather by entering any place name with live autocomplete and location validation.
- Get current weather based on their exact device location using browser geolocation.
- View detailed, real-time weather data including temperature, wind speed, direction, and weather conditions.
- Experience dynamic animated backgrounds and smooth UI animations reflecting current weather.
- Enjoy a mobile-friendly and visually appealing interface optimized for all screen sizes.

The project leverages the Open-Meteo API for weather and geocoding data.

---

## Features

- **Manual Place Search:** Enter any location name to retrieve weather data.
- **Current Location Weather:** Quickly fetch weather for your actual geographical location.
- **Dynamic Animated Backgrounds:** Backgrounds change and animate based on weather conditions.
- **Responsive Design:** Fluid layout adapts to desktop, tablet, and mobile screens.
- **Error Handling:** User-friendly messages for invalid inputs or API errors.
- **Loading States:** Buttons and inputs visually reflect data fetching state.
- **Lightweight:** Uses React hooks for state management without heavy dependencies.

---

## Technology Stack

- **React** (functional components and hooks `useState`, `useEffect`)
- **Open-Meteo API** for weather and geolocation data
- **CSS3** for responsive layout and animated backgrounds
- **JavaScript (ES6+)** for asynchronous data fetching and UI logic

---

## Installation & Setup Instructions

1. **Clone the repository**
git clone https://github.com/yourusername/weather-now.git
cd weather-now


2. **Install dependencies**
        `npm install`


3. **Start the development server**
        `npm start`


4. **Open your browser and navigate to** 
        `http://localhost:3000`


## Project Structure

/src
/components
WeatherInput.js # Input components with location search
WeatherDisplay.js # Displays weather data
App.js # Main app component managing state and logic
App.css # Styling and animated backgrounds
index.js # React DOM rendering


## Core Concepts Used

- **React State Management:** Using `useState` for controlled inputs and fetched weather data.
- **API Integration:** Fetching from Open-Meteo endpoints with error handling.
- **Geolocation API:** Accessing browser location to get real-time coordinates.
- **Conditional Styling:** Dynamic CSS classes based on weather codes.
- **Responsive CSS:** Media queries and flex layouts for all screen sizes.
- **CSS Animations:** Keyframe animations for backgrounds, buttons, and fade effects.

---

## Future Improvements

- Add detailed hourly & weekly weather forecasts.
- Improve place search input with autocomplete suggestions.
- Integrate weather icons based on current weather codes.
- Implement theme toggle (light/dark modes).
- Add unit tests for components and API calls.

---

## Live Demo

[Insert your deployed app URL here, e.g., on CodeSandbox, Vercel, Netlify]

---

## Contact

Created by [Your Name] — feel free to connect!

- GitHub: https://github.com/ErShivamTiwariOfficial
- LinkedIn: https://www.linkedin.com/in/ershivamtiwari

---

*This project was built as part of a technical interview challenge to demonstrate React proficiency, API integration, UI/UX design, and responsive development skills.*
