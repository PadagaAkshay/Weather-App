# Weather Dashboard - API Data Display

A responsive weather application that fetches and displays real-time weather data from the OpenWeatherMap API.

## 🚀 Features

- **Real-time Weather Data**: Fetches current weather information from OpenWeatherMap API
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive UI**: Modern design with smooth animations and hover effects
- **Comprehensive Weather Info**: Temperature, humidity, wind speed, pressure, UV index, and more
- **Demo Mode**: Works with demo data when API key is not configured
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox, Grid, animations, and gradients
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

## 📁 Project Structure

```
TaskOne/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend server
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
└── README.md          # Documentation
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get API Key (Optional)

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Update the `.env` file:

```
WEATHER_API_KEY=your_actual_api_key_here
```

**Note**: The app works with demo data if no API key is provided.

### 3. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### 4. Open the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🌟 Usage

1. **Search for Weather**: Enter any city name in the search box
2. **View Details**: See comprehensive weather information including:
   - Current temperature and "feels like" temperature
   - Weather description with appropriate icons
   - Humidity, wind speed, and atmospheric pressure
   - Visibility and cloudiness
   - UV index
   - Sunrise and sunset times

3. **Responsive Experience**: The app adapts to different screen sizes automatically

## 🎨 Features Showcase

### Weather Information Displayed
- ☀️ Temperature (current and "feels like")
- 🌤️ Weather conditions with icons
- 💧 Humidity percentage
- 💨 Wind speed and direction
- 📊 Atmospheric pressure
- 👁️ Visibility distance
- ☁️ Cloud coverage
- 🌅 Sunrise and sunset times
- ☀️ UV Index

### UI/UX Features
- 🎯 Modern gradient backgrounds
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🎨 Color-coded weather cards
- 🔄 Loading states and error handling
- 🖱️ Interactive hover effects

## 🔧 API Endpoints

### Weather Data
- **GET** `/api/weather?city={cityname}`
  - Fetches weather data for specified city
  - Returns comprehensive weather information

### Health Check
- **GET** `/api/health`
  - Server status and configuration info

## 🌐 Demo Cities

Try searching for these cities:
- London, UK
- New York, USA
- Tokyo, Japan
- Paris, France
- Mumbai, India
- Sydney, Australia

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `WEATHER_API_KEY` | OpenWeatherMap API key | demo mode |
| `PORT` | Server port | 3000 |

## 🐛 Error Handling

The application handles various error scenarios:
- Invalid city names
- Network connectivity issues
- API rate limits
- Server errors
- Missing API configuration

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance Features

- Efficient API caching
- Optimized CSS with modern properties
- Minimal JavaScript bundle
- Fast server response times

## 🔮 Future Enhancements

- 7-day weather forecast
- Weather maps integration
- Location-based auto-detection
- Weather alerts and notifications
- Historical weather data
- Multiple language support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using HTML, CSS, JavaScript, and Node.js**
