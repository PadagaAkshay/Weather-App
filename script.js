// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = 'demo'; // Will be replaced with actual API key
        this.baseUrl = 'http://localhost:3000/api/weather';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setCurrentDate();
        this.loadDefaultCity();
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');

        searchBtn.addEventListener('click', () => {
            this.searchWeather();
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });

        // Add some example cities for demo
        cityInput.placeholder = 'Try: London, New York, Tokyo, Paris, Mumbai';
    }

    setCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    }

    async loadDefaultCity() {
        // Load weather for London by default
        await this.getWeatherData('London');
    }

    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();

        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        await this.getWeatherData(city);
    }

    async getWeatherData(city) {
        this.showLoading(true);
        this.hideError();
        this.hideWeatherContainer();

        try {
            // First, try to get data from our Node.js backend
            const response = await fetch(`${this.baseUrl}?city=${encodeURIComponent(city)}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    throw new Error('Unable to fetch weather data. Please try again.');
                }
            }

            const data = await response.json();
            this.displayWeatherData(data);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            
            // Fallback to demo data if backend is not available
            if (error.message.includes('fetch')) {
                console.log('Backend not available, showing demo data');
                this.showDemoData(city);
            } else {
                this.showError(error.message);
            }
        } finally {
            this.showLoading(false);
        }
    }

    showDemoData(city) {
        // Demo data for when backend is not available
        const demoData = {
            name: city || 'Demo City',
            main: {
                temp: 22,
                feels_like: 25,
                humidity: 65,
                pressure: 1013
            },
            weather: [{
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }],
            wind: {
                speed: 3.5
            },
            visibility: 10000,
            clouds: {
                all: 20
            },
            sys: {
                sunrise: 1629872400,
                sunset: 1629919200
            },
            uvi: 5.2
        };

        this.displayWeatherData(demoData);
        this.showError('Demo Mode: Backend server not running. This is sample data.');
    }

    displayWeatherData(data) {
        // Update city name
        document.getElementById('cityName').textContent = data.name;

        // Update main weather info
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('feelsLike').textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

        // Update weather icon
        const iconCode = data.weather[0].icon || '01d';
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.className = this.getWeatherIconClass(data.weather[0].main, iconCode);

        // Update weather details
        document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
        document.getElementById('uvIndex').textContent = data.uvi ? data.uvi.toFixed(1) : 'N/A';
        document.getElementById('cloudiness').textContent = `${data.clouds.all}%`;

        // Update sunrise/sunset
        document.getElementById('sunrise').textContent = this.formatTime(data.sys.sunrise);
        document.getElementById('sunset').textContent = this.formatTime(data.sys.sunset);

        // Show weather container
        this.showWeatherContainer();
    }

    getWeatherIconClass(weatherMain, iconCode) {
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Dust': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'Sand': 'fas fa-smog',
            'Ash': 'fas fa-smog',
            'Squall': 'fas fa-wind',
            'Tornado': 'fas fa-tornado'
        };

        return iconMap[weatherMain] || 'fas fa-cloud';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.style.display = 'block';
            loading.classList.add('show');
        } else {
            loading.style.display = 'none';
            loading.classList.remove('show');
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'none';
    }

    showWeatherContainer() {
        const container = document.getElementById('weatherContainer');
        container.style.display = 'block';
        container.classList.add('show');
    }

    hideWeatherContainer() {
        const container = document.getElementById('weatherContainer');
        container.style.display = 'none';
        container.classList.remove('show');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to detail items
    const detailItems = document.querySelectorAll('.detail-item, .info-item');
    detailItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add typing indicator for search input
    const cityInput = document.getElementById('cityInput');
    let typingTimer;
    
    cityInput.addEventListener('input', function() {
        clearTimeout(typingTimer);
        this.style.borderLeft = '4px solid #00b894';
        
        typingTimer = setTimeout(() => {
            this.style.borderLeft = '';
        }, 1000);
    });
});
