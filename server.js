const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// OpenWeatherMap API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'your_api_key_here';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;
        
        if (!city) {
            return res.status(400).json({ 
                error: 'City parameter is required' 
            });
        }

        console.log(`Fetching weather data for: ${city}`);

        // If no API key is set, return demo data
        if (WEATHER_API_KEY === 'your_api_key_here') {
            console.log('No API key configured, returning demo data');
            return res.json(getDemoWeatherData(city));
        }

        // Fetch current weather data
        const weatherResponse = await axios.get(`${WEATHER_BASE_URL}/weather`, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });

        const weatherData = weatherResponse.data;

        // Fetch UV index data
        let uvIndex = null;
        try {
            const uvResponse = await axios.get(`${WEATHER_BASE_URL}/uvi`, {
                params: {
                    lat: weatherData.coord.lat,
                    lon: weatherData.coord.lon,
                    appid: WEATHER_API_KEY
                }
            });
            uvIndex = uvResponse.data.value;
        } catch (uvError) {
            console.warn('Could not fetch UV index data:', uvError.message);
        }

        // Combine the data
        const responseData = {
            ...weatherData,
            uvi: uvIndex
        };

        console.log(`Successfully fetched weather data for ${city}`);
        res.json(responseData);

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        
        if (error.response) {
            // API responded with error
            if (error.response.status === 404) {
                return res.status(404).json({ 
                    error: 'City not found. Please check the spelling and try again.' 
                });
            } else if (error.response.status === 401) {
                return res.status(500).json({ 
                    error: 'Invalid API key. Please check your configuration.' 
                });
            } else {
                return res.status(500).json({ 
                    error: 'Weather service temporarily unavailable. Please try again later.' 
                });
            }
        } else {
            // Network or other error
            return res.status(500).json({ 
                error: 'Unable to fetch weather data. Please try again later.' 
            });
        }
    }
});

// Function to generate demo weather data
function getDemoWeatherData(city) {
    const demoData = {
        coord: { lon: -0.1257, lat: 51.5085 },
        weather: [
            {
                id: 800,
                main: "Clear",
                description: "clear sky",
                icon: "01d"
            }
        ],
        base: "stations",
        main: {
            temp: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
            feels_like: Math.floor(Math.random() * 30) + 5,
            temp_min: Math.floor(Math.random() * 25) + 2,
            temp_max: Math.floor(Math.random() * 35) + 10,
            pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
            humidity: Math.floor(Math.random() * 60) + 20 // 20-80%
        },
        visibility: Math.floor(Math.random() * 15000) + 5000, // 5-20km
        wind: {
            speed: Math.floor(Math.random() * 10) + 1, // 1-10 m/s
            deg: Math.floor(Math.random() * 360)
        },
        clouds: {
            all: Math.floor(Math.random() * 100) // 0-100%
        },
        dt: Math.floor(Date.now() / 1000),
        sys: {
            type: 1,
            id: 1414,
            country: "GB",
            sunrise: Math.floor(Date.now() / 1000) - 25200, // 7 hours ago
            sunset: Math.floor(Date.now() / 1000) + 25200   // 7 hours from now
        },
        timezone: 0,
        id: 2643743,
        name: city || "Demo City",
        cod: 200,
        uvi: Math.floor(Math.random() * 10) + 1 // 1-10 UV index
    };

    // Vary weather based on city name for demo
    const weatherTypes = [
        { main: "Clear", description: "clear sky", icon: "01d" },
        { main: "Clouds", description: "few clouds", icon: "02d" },
        { main: "Clouds", description: "scattered clouds", icon: "03d" },
        { main: "Clouds", description: "broken clouds", icon: "04d" },
        { main: "Rain", description: "light rain", icon: "10d" },
        { main: "Rain", description: "moderate rain", icon: "10d" }
    ];

    if (city) {
        const weatherIndex = city.length % weatherTypes.length;
        demoData.weather[0] = weatherTypes[weatherIndex];
    }

    return demoData;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Weather API Server is running',
        timestamp: new Date().toISOString(),
        apiKeyConfigured: WEATHER_API_KEY !== 'your_api_key_here'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ 
        error: 'Internal server error' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found' 
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌤️  Weather API Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
    console.log(`🔑 API Key configured: ${WEATHER_API_KEY !== 'your_api_key_here' ? 'Yes' : 'No (using demo data)'}`);
    
    if (WEATHER_API_KEY === 'your_api_key_here') {
        console.log(`\n⚠️  To use real weather data:`);
        console.log(`   1. Sign up at https://openweathermap.org/api`);
        console.log(`   2. Get your free API key`);
        console.log(`   3. Create a .env file with: WEATHER_API_KEY=your_actual_api_key`);
        console.log(`   4. Restart the server\n`);
    }
});
