# Weather-Forecast :– Live Weather Web App

Weather Now is a front-end web project designed to display real-time weather data using the user’s current location or a manually entered city. It features a modern dark-themed interface with glassy cards, icons, and responsive styling. It is built using HTML, CSS, and JavaScript.

## Live Demo
https://parthp137.github.io/Weather-Forecast/

## Features

### Weather System
- Live weather fetching
- Current location weather using Geolocation
- City-based weather search
- Automatic data rendering
- Error messages for invalid inputs

### Weather Information
- Temperature
- Feels-like temperature
- Weather condition and icon
- Humidity
- Wind speed
- Atmospheric pressure
- Updated local time

### UI Design
- Glassmorphism weather card
- Stats grid with icons
- Glow and hover effects
- Circular weather icon badge
- Responsive layout for mobile and desktop

### Functionality
- API request handling
- Location permission handling
- Search-based event handling
- Dynamic DOM updates

## Tech Stack
Frontend: HTML, CSS, JavaScript  

API: OpenWeatherMap API  

Tools: VS Code, Git, GitHub Pages

## Design Overview
The website uses a modern dark theme and contains the following primary UI elements:

- Title and subtitle header
- “Use My Location” button
- City search bar
- Central weather dashboard
- Icon-based stats boxes
- Footer with API attribution

All interactions and updates are implemented using JavaScript.

## Limitations
- Requires an API key from OpenWeatherMap
- No backend integration
- No multi-day forecast
- Internet required for weather data
- No saved search history

## Future Enhancements
- 3-day or weekly weather forecast
- Light/Dark mode toggle
- Animated weather backgrounds
- Recent searches module
- Loading animation during fetch

## Project Structure
├── index.html   # Main webpage

├── style.css    # Styling and layout

├── script.js    # Weather logic and interactivity

├── assets/      # (Optional) icons/images

└── README.md

##How to Run

### 1. Clone the repository:

git clone https://github.com/your-username/Weather-Forecast.git
cd Weather-Forecast

### 2. Add your API key:
- Open script.js and replace:

js
Copy code
YOUR_API_KEY_HERE
with your actual OpenWeatherMap API key.

### 3. Open the project in a browser:
- Open index.html directly, or

###4. Start a local server:
python -m http.server 8000

### 5. Open your browser and visit:
http://localhost:8000
