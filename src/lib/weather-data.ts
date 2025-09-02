import type { WeatherData, Unit } from './types';

const londonData: WeatherData = {
  current: {
    temperature: 15,
    humidity: 70,
    windSpeed: 10,
    weatherConditions: 'Partly cloudy',
  },
  hourlyForecast: [
    { time: '3 PM', temperature: 16, weatherConditions: 'Partly cloudy' },
    { time: '4 PM', temperature: 15, weatherConditions: 'Cloudy' },
    { time: '5 PM', temperature: 14, weatherConditions: 'Cloudy' },
    { time: '6 PM', temperature: 13, weatherConditions: 'Light rain' },
    { time: '7 PM', temperature: 12, weatherConditions: 'Light rain' },
    { time: '8 PM', temperature: 12, weatherConditions: 'Cloudy' },
    { time: '9 PM', temperature: 11, weatherConditions: 'Partly cloudy' },
    { time: '10 PM', temperature: 10, weatherConditions: 'Clear' },
  ],
  dailyForecast: [
    { day: 'Today', highTemperature: 18, lowTemperature: 10, weatherConditions: 'Partly cloudy' },
    { day: 'Mon', highTemperature: 19, lowTemperature: 11, weatherConditions: 'Sunny' },
    { day: 'Tue', highTemperature: 20, lowTemperature: 12, weatherConditions: 'Sunny' },
    { day: 'Wed', highTemperature: 17, lowTemperature: 9, weatherConditions: 'Rain' },
    { day: 'Thu', highTemperature: 16, lowTemperature: 8, weatherConditions: 'Cloudy' },
    { day: 'Fri', highTemperature: 18, lowTemperature: 10, weatherConditions: 'Partly cloudy' },
    { day: 'Sat', highTemperature: 21, lowTemperature: 13, weatherConditions: 'Sunny' },
  ],
  weatherAlerts: ['Minor flood warning for Thames river areas.'],
  news: [
    { title: 'Heatwave expected to hit Europe next week', summary: 'Meteorologists predict record-breaking temperatures across the continent.', source: 'Global Weather News', url: '#' },
    { title: 'New satellite to improve storm tracking', summary: 'The Sentinel-6 satellite is now fully operational, providing more accurate sea level data.', source: 'Science Today', url: '#' },
  ],
  imageUrl: 'https://picsum.photos/seed/london/600/400'
};

const newYorkData: WeatherData = {
  current: {
    temperature: 25,
    humidity: 60,
    windSpeed: 5,
    weatherConditions: 'Sunny',
  },
  hourlyForecast: [
    { time: '3 PM', temperature: 26, weatherConditions: 'Sunny' },
    { time: '4 PM', temperature: 26, weatherConditions: 'Sunny' },
    { time: '5 PM', temperature: 25, weatherConditions: 'Partly cloudy' },
    { time: '6 PM', temperature: 24, weatherConditions: 'Partly cloudy' },
    { time: '7 PM', temperature: 23, weatherConditions: 'Clear' },
    { time: '8 PM', temperature: 22, weatherConditions: 'Clear' },
    { time: '9 PM', temperature: 21, weatherConditions: 'Clear' },
    { time: '10 PM', temperature: 20, weatherConditions: 'Clear' },
  ],
  dailyForecast: [
    { day: 'Today', highTemperature: 28, lowTemperature: 20, weatherConditions: 'Sunny' },
    { day: 'Mon', highTemperature: 29, lowTemperature: 21, weatherConditions: 'Sunny' },
    { day: 'Tue', highTemperature: 30, lowTemperature: 22, weatherConditions: 'Partly cloudy' },
    { day: 'Wed', highTemperature: 27, lowTemperature: 19, weatherConditions: 'Thunderstorm' },
    { day: 'Thu', highTemperature: 26, lowTemperature: 18, weatherConditions: 'Cloudy' },
    { day: 'Fri', highTemperature: 28, lowTemperature: 20, weatherConditions: 'Sunny' },
    { day: 'Sat', highTemperature: 31, lowTemperature: 23, weatherConditions: 'Sunny' },
  ],
  weatherAlerts: [],
  news: [
    { title: 'Hurricane season predictions are in', summary: 'NOAA predicts an above-average hurricane season for the Atlantic.', source: 'National Weather Post', url: '#' },
    { title: 'Understanding the urban heat island effect', summary: 'Cities are getting hotter. Here is what you need to know about the phenomenon.', source: 'Urban Climate Magazine', url: '#' },
  ],
  imageUrl: 'https://picsum.photos/seed/new-york/600/400'
};

const tokyoData: WeatherData = {
  current: {
    temperature: 28,
    humidity: 85,
    windSpeed: 15,
    weatherConditions: 'Rain',
  },
  hourlyForecast: [
    { time: '3 PM', temperature: 28, weatherConditions: 'Rain' },
    { time: '4 PM', temperature: 27, weatherConditions: 'Heavy rain' },
    { time: '5 PM', temperature: 27, weatherConditions: 'Rain' },
    { time: '6 PM', temperature: 26, weatherConditions: 'Light rain' },
    { time: '7 PM', temperature: 26, weatherConditions: 'Cloudy' },
    { time: '8 PM', temperature: 25, weatherConditions: 'Cloudy' },
    { time: '9 PM', temperature: 25, weatherConditions: 'Partly cloudy' },
    { time: '10 PM', temperature: 24, weatherConditions: 'Partly cloudy' },
  ],
  dailyForecast: [
    { day: 'Today', highTemperature: 30, lowTemperature: 24, weatherConditions: 'Rain' },
    { day: 'Mon', highTemperature: 31, lowTemperature: 25, weatherConditions: 'Thunderstorm' },
    { day: 'Tue', highTemperature: 29, lowTemperature: 24, weatherConditions: 'Rain' },
    { day: 'Wed', highTemperature: 32, lowTemperature: 26, weatherConditions: 'Partly cloudy' },
    { day: 'Thu', highTemperature: 33, lowTemperature: 27, weatherConditions: 'Sunny' },
    { day: 'Fri', highTemperature: 31, lowTemperature: 26, weatherConditions: 'Partly cloudy' },
    { day: 'Sat', highTemperature: 30, lowTemperature: 25, weatherConditions: 'Rain' },
  ],
  weatherAlerts: ['Typhoon warning issued for the Kanto region.'],
  news: [
    { title: 'Typhoon season approaches Japan', summary: 'Experts advise residents to prepare for an active typhoon season.', source: 'Japan Weather Times', url: '#' },
    { title: 'Cherry blossoms bloomed early this year', summary: 'Climate change is affecting the timing of Japan\'s iconic sakura season.', source: 'Nature & Climate', url: '#' },
  ],
  imageUrl: 'https://picsum.photos/seed/tokyo/600/400'
};

const parisData: WeatherData = {
  current: { temperature: 18, humidity: 65, windSpeed: 8, weatherConditions: 'Sunny' },
  hourlyForecast: [
    { time: '3 PM', temperature: 19, weatherConditions: 'Sunny' },
    { time: '6 PM', temperature: 17, weatherConditions: 'Partly cloudy' },
    { time: '9 PM', temperature: 15, weatherConditions: 'Clear' },
  ],
  dailyForecast: [
    { day: 'Today', highTemperature: 20, lowTemperature: 12, weatherConditions: 'Sunny' },
    { day: 'Mon', highTemperature: 22, lowTemperature: 14, weatherConditions: 'Partly cloudy' },
    { day: 'Tue', highTemperature: 21, lowTemperature: 13, weatherConditions: 'Partly cloudy' },
    { day: 'Wed', highTemperature: 23, lowTemperature: 15, weatherConditions: 'Sunny' },
    { day: 'Thu', highTemperature: 20, lowTemperature: 12, weatherConditions: 'Rain' },
    { day: 'Fri', highTemperature: 19, lowTemperature: 11, weatherConditions: 'Cloudy' },
    { day: 'Sat', highTemperature: 22, lowTemperature: 14, weatherConditions: 'Sunny' },
  ],
  weatherAlerts: [],
  news: [{ title: 'Seine river levels normal for the season', summary: 'No flood alerts currently in effect for Paris.', source: 'Meteo France', url: '#' }],
  imageUrl: 'https://picsum.photos/seed/paris/600/400'
};

const berlinData: WeatherData = {
    current: { temperature: 16, humidity: 75, windSpeed: 12, weatherConditions: 'Cloudy' },
    hourlyForecast: [
        { time: '3 PM', temperature: 17, weatherConditions: 'Cloudy' },
        { time: '6 PM', temperature: 15, weatherConditions: 'Light rain' },
        { time: '9 PM', temperature: 13, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 18, lowTemperature: 10, weatherConditions: 'Cloudy' },
        { day: 'Mon', highTemperature: 19, lowTemperature: 11, weatherConditions: 'Rain' },
        { day: 'Tue', highTemperature: 17, lowTemperature: 9, weatherConditions: 'Rain' },
        { day: 'Wed', highTemperature: 20, lowTemperature: 12, weatherConditions: 'Partly cloudy' },
        { day: 'Thu', highTemperature: 21, lowTemperature: 13, weatherConditions: 'Sunny' },
        { day: 'Fri', highTemperature: 18, lowTemperature: 10, weatherConditions: 'Cloudy' },
        { day: 'Sat', highTemperature: 19, lowTemperature: 11, weatherConditions: 'Partly cloudy' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Pollen count high in Berlin', summary: 'Allergy sufferers should take precautions.', source: 'Wetter.de', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/berlin/600/400'
};

const moscowData: WeatherData = {
    current: { temperature: 10, humidity: 80, windSpeed: 5, weatherConditions: 'Light rain' },
    hourlyForecast: [
        { time: '3 PM', temperature: 11, weatherConditions: 'Light rain' },
        { time: '6 PM', temperature: 9, weatherConditions: 'Rain' },
        { time: '9 PM', temperature: 8, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 12, lowTemperature: 6, weatherConditions: 'Rain' },
        { day: 'Mon', highTemperature: 14, lowTemperature: 7, weatherConditions: 'Partly cloudy' },
        { day: 'Tue', highTemperature: 13, lowTemperature: 5, weatherConditions: 'Cloudy' },
        { day: 'Wed', highTemperature: 15, lowTemperature: 8, weatherConditions: 'Sunny' },
        { day: 'Thu', highTemperature: 12, lowTemperature: 6, weatherConditions: 'Rain' },
        { day: 'Fri', highTemperature: 11, lowTemperature: 4, weatherConditions: 'Cloudy' },
        { day: 'Sat', highTemperature: 14, lowTemperature: 7, weatherConditions: 'Partly cloudy' },
    ],
    weatherAlerts: [],
    news: [{ title: 'First signs of autumn in Moscow', summary: 'Temperatures are dropping as the city heads into September.', source: 'Gismeteo', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/moscow/600/400'
};

const beijingData: WeatherData = {
    current: { temperature: 22, humidity: 70, windSpeed: 6, weatherConditions: 'Haze' },
    hourlyForecast: [
        { time: '3 PM', temperature: 23, weatherConditions: 'Haze' },
        { time: '6 PM', temperature: 21, weatherConditions: 'Haze' },
        { time: '9 PM', temperature: 19, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 25, lowTemperature: 18, weatherConditions: 'Haze' },
        { day: 'Mon', highTemperature: 26, lowTemperature: 19, weatherConditions: 'Partly cloudy' },
        { day: 'Tue', highTemperature: 27, lowTemperature: 20, weatherConditions: 'Sunny' },
        { day: 'Wed', highTemperature: 24, lowTemperature: 17, weatherConditions: 'Haze' },
        { day: 'Thu', highTemperature: 26, lowTemperature: 19, weatherConditions: 'Cloudy' },
        { day: 'Fri', highTemperature: 28, lowTemperature: 21, weatherConditions: 'Partly cloudy' },
        { day: 'Sat', highTemperature: 27, lowTemperature: 20, weatherConditions: 'Sunny' },
    ],
    weatherAlerts: ['Air quality alert: Unhealthy for sensitive groups.'],
    news: [{ title: 'Efforts to combat pollution continue', summary: 'Beijing implements new measures to improve air quality.', source: 'China Daily', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/beijing/600/400'
};

const sydneyData: WeatherData = {
    current: { temperature: 20, humidity: 60, windSpeed: 20, weatherConditions: 'Sunny' },
    hourlyForecast: [
        { time: '3 PM', temperature: 21, weatherConditions: 'Sunny' },
        { time: '6 PM', temperature: 18, weatherConditions: 'Clear' },
        { time: '9 PM', temperature: 16, weatherConditions: 'Clear' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 22, lowTemperature: 15, weatherConditions: 'Sunny' },
        { day: 'Mon', highTemperature: 23, lowTemperature: 16, weatherConditions: 'Sunny' },
        { day: 'Tue', highTemperature: 21, lowTemperature: 14, weatherConditions: 'Partly cloudy' },
        { day: 'Wed', highTemperature: 19, lowTemperature: 12, weatherConditions: 'Rain' },
        { day: 'Thu', highTemperature: 22, lowTemperature: 15, weatherConditions: 'Cloudy' },
        { day: 'Fri', highTemperature: 24, lowTemperature: 17, weatherConditions: 'Sunny' },
        { day: 'Sat', highTemperature: 23, lowTemperature: 16, weatherConditions: 'Partly cloudy' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Whale watching season in full swing', summary: 'Humpback whales can be spotted along the Sydney coast.', source: '7NEWS Sydney', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/sydney/600/400'
};

const cairoData: WeatherData = {
    current: { temperature: 35, humidity: 40, windSpeed: 10, weatherConditions: 'Sunny' },
    hourlyForecast: [
        { time: '3 PM', temperature: 36, weatherConditions: 'Sunny' },
        { time: '6 PM', temperature: 33, weatherConditions: 'Clear' },
        { time: '9 PM', temperature: 30, weatherConditions: 'Clear' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 38, lowTemperature: 25, weatherConditions: 'Sunny' },
        { day: 'Mon', highTemperature: 39, lowTemperature: 26, weatherConditions: 'Sunny' },
        { day: 'Tue', highTemperature: 40, lowTemperature: 27, weatherConditions: 'Sunny' },
        { day: 'Wed', highTemperature: 38, lowTemperature: 25, weatherConditions: 'Sunny' },
        { day: 'Thu', highTemperature: 37, lowTemperature: 24, weatherConditions: 'Sunny' },
        { day: 'Fri', highTemperature: 39, lowTemperature: 26, weatherConditions: 'Clear' },
        { day: 'Sat', highTemperature: 41, lowTemperature: 28, weatherConditions: 'Sunny' },
    ],
    weatherAlerts: ['Extreme heat warning in effect.'],
    news: [{ title: 'Discover the history of ancient Egypt', summary: 'Museums offer a cool escape from the summer heat.', source: 'Egypt Today', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/cairo/600/400'
};

const newDelhiData: WeatherData = {
    current: { temperature: 38, humidity: 50, windSpeed: 5, weatherConditions: 'Haze' },
    hourlyForecast: [
        { time: '3 PM', temperature: 39, weatherConditions: 'Haze' },
        { time: '6 PM', temperature: 36, weatherConditions: 'Haze' },
        { time: '9 PM', temperature: 34, weatherConditions: 'Partly cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 42, lowTemperature: 30, weatherConditions: 'Haze' },
        { day: 'Mon', highTemperature: 43, lowTemperature: 31, weatherConditions: 'Sunny' },
        { day: 'Tue', highTemperature: 41, lowTemperature: 29, weatherConditions: 'Haze' },
        { day: 'Wed', highTemperature: 40, lowTemperature: 28, weatherConditions: 'Thunderstorm' },
        { day: 'Thu', highTemperature: 39, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
        { day: 'Fri', highTemperature: 42, lowTemperature: 30, weatherConditions: 'Sunny' },
        { day: 'Sat', highTemperature: 44, lowTemperature: 32, weatherConditions: 'Sunny' },
    ],
    weatherAlerts: ['Heatwave warning: Avoid outdoor activities during midday.'],
    news: [{ title: 'Monsoon season to arrive late', summary: 'Meteorological department predicts a delay in monsoon rains.', source: 'The Times of India', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/new-delhi/600/400'
};

const mumbaiData: WeatherData = {
    current: { temperature: 31, humidity: 85, windSpeed: 18, weatherConditions: 'Rain' },
    hourlyForecast: [
        { time: '3 PM', temperature: 31, weatherConditions: 'Rain' },
        { time: '6 PM', temperature: 30, weatherConditions: 'Heavy rain' },
        { time: '9 PM', temperature: 29, weatherConditions: 'Rain' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 32, lowTemperature: 27, weatherConditions: 'Rain' },
        { day: 'Mon', highTemperature: 31, lowTemperature: 27, weatherConditions: 'Thunderstorm' },
        { day: 'Tue', highTemperature: 32, lowTemperature: 28, weatherConditions: 'Rain' },
        { day: 'Wed', highTemperature: 31, lowTemperature: 27, weatherConditions: 'Heavy rain' },
        { day: 'Thu', highTemperature: 30, lowTemperature: 26, weatherConditions: 'Rain' },
        { day: 'Fri', highTemperature: 31, lowTemperature: 27, weatherConditions: 'Rain' },
        { day: 'Sat', highTemperature: 32, lowTemperature: 28, weatherConditions: 'Thunderstorm' },
    ],
    weatherAlerts: ['High tide warning for coastal areas.'],
    news: [{ title: 'Mumbai prepares for heavy monsoon rains', summary: 'City authorities are on high alert for potential flooding.', source: 'Hindustan Times', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/mumbai/600/400'
};

const kolkataData: WeatherData = {
    current: { temperature: 33, humidity: 88, windSpeed: 15, weatherConditions: 'Thunderstorm' },
    hourlyForecast: [
        { time: '3 PM', temperature: 33, weatherConditions: 'Thunderstorm' },
        { time: '6 PM', temperature: 31, weatherConditions: 'Rain' },
        { time: '9 PM', temperature: 30, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 34, lowTemperature: 28, weatherConditions: 'Thunderstorm' },
        { day: 'Mon', highTemperature: 35, lowTemperature: 28, weatherConditions: 'Rain' },
        { day: 'Tue', highTemperature: 34, lowTemperature: 27, weatherConditions: 'Thunderstorm' },
        { day: 'Wed', highTemperature: 33, lowTemperature: 27, weatherConditions: 'Rain' },
        { day: 'Thu', highTemperature: 34, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
        { day: 'Fri', highTemperature: 35, lowTemperature: 29, weatherConditions: 'Thunderstorm' },
        { day: 'Sat', highTemperature: 34, lowTemperature: 28, weatherConditions: 'Rain' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Durga Puja preparations begin', summary: 'The city is gearing up for its biggest festival.', source: 'The Telegraph - Calcutta', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/kolkata/600/400'
};

const chennaiData: WeatherData = {
    current: { temperature: 34, humidity: 75, windSpeed: 12, weatherConditions: 'Partly cloudy' },
    hourlyForecast: [
        { time: '3 PM', temperature: 35, weatherConditions: 'Partly cloudy' },
        { time: '6 PM', temperature: 33, weatherConditions: 'Partly cloudy' },
        { time: '9 PM', temperature: 31, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 36, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
        { day: 'Mon', highTemperature: 37, lowTemperature: 29, weatherConditions: 'Sunny' },
        { day: 'Tue', highTemperature: 36, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
        { day: 'Wed', highTemperature: 35, lowTemperature: 27, weatherConditions: 'Thunderstorm' },
        { day: 'Thu', highTemperature: 36, lowTemperature: 28, weatherConditions: 'Cloudy' },
        { day: 'Fri', highTemperature: 37, lowTemperature: 29, weatherConditions: 'Partly cloudy' },
        { day: 'Sat', highTemperature: 36, lowTemperature: 28, weatherConditions: 'Sunny' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Fishermen warned of strong winds', summary: 'The sea is expected to be rough for the next 48 hours.', source: 'The Hindu', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/chennai/600/400'
};

const bengaluruData: WeatherData = {
    current: { temperature: 27, humidity: 80, windSpeed: 10, weatherConditions: 'Cloudy' },
    hourlyForecast: [
        { time: '3 PM', temperature: 28, weatherConditions: 'Cloudy' },
        { time: '6 PM', temperature: 26, weatherConditions: 'Light rain' },
        { time: '9 PM', temperature: 25, weatherConditions: 'Cloudy' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 29, lowTemperature: 21, weatherConditions: 'Light rain' },
        { day: 'Mon', highTemperature: 30, lowTemperature: 22, weatherConditions: 'Partly cloudy' },
        { day: 'Tue', highTemperature: 28, lowTemperature: 21, weatherConditions: 'Rain' },
        { day: 'Wed', highTemperature: 29, lowTemperature: 20, weatherConditions: 'Cloudy' },
        { day: 'Thu', highTemperature: 31, lowTemperature: 22, weatherConditions: 'Partly cloudy' },
        { day: 'Fri', highTemperature: 29, lowTemperature: 21, weatherConditions: 'Light rain' },
        { day: 'Sat', highTemperature: 30, lowTemperature: 22, weatherConditions: 'Partly cloudy' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Bengaluru\'s tech scene continues to boom', summary: 'The city remains a top destination for IT professionals.', source: 'Deccan Herald', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/bengaluru/600/400'
};

const hyderabadData: WeatherData = {
    current: { temperature: 32, humidity: 65, windSpeed: 8, weatherConditions: 'Sunny' },
    hourlyForecast: [
        { time: '3 PM', temperature: 33, weatherConditions: 'Sunny' },
        { time: '6 PM', temperature: 31, weatherConditions: 'Partly cloudy' },
        { time: '9 PM', temperature: 29, weatherConditions: 'Clear' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 35, lowTemperature: 26, weatherConditions: 'Sunny' },
        { day: 'Mon', highTemperature: 36, lowTemperature: 27, weatherConditions: 'Partly cloudy' },
        { day: 'Tue', highTemperature: 37, lowTemperature: 28, weatherConditions: 'Sunny' },
        { day: 'Wed', highTemperature: 35, lowTemperature: 26, weatherConditions: 'Thunderstorm' },
        { day: 'Thu', highTemperature: 34, lowTemperature: 25, weatherConditions: 'Cloudy' },
        { day: 'Fri', highTemperature: 36, lowTemperature: 27, weatherConditions: 'Sunny' },
        { day: 'Sat', highTemperature: 37, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
    ],
    weatherAlerts: [],
    news: [{ title: 'Charminar restoration project nears completion', summary: 'The iconic monument is getting a facelift.', source: 'Telangana Today', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/hyderabad/600/400'
};

const jaipurData: WeatherData = {
    current: { temperature: 39, humidity: 30, windSpeed: 7, weatherConditions: 'Sunny' },
    hourlyForecast: [
        { time: '3 PM', temperature: 40, weatherConditions: 'Sunny' },
        { time: '6 PM', temperature: 37, weatherConditions: 'Clear' },
        { time: '9 PM', temperature: 35, weatherConditions: 'Clear' },
    ],
    dailyForecast: [
        { day: 'Today', highTemperature: 43, lowTemperature: 29, weatherConditions: 'Sunny' },
        { day: 'Mon', highTemperature: 44, lowTemperature: 30, weatherConditions: 'Sunny' },
        { day: 'Tue', highTemperature: 42, lowTemperature: 28, weatherConditions: 'Sunny' },
        { day: 'Wed', highTemperature: 41, lowTemperature: 28, weatherConditions: 'Partly cloudy' },
        { day: 'Thu', highTemperature: 43, lowTemperature: 29, weatherConditions: 'Sunny' },
        { day: 'Fri', highTemperature: 45, lowTemperature: 31, weatherConditions: 'Sunny' },
        { day: 'Sat', highTemperature: 44, lowTemperature: 30, weatherConditions: 'Haze' },
    ],
    weatherAlerts: ['Extreme heat warning in effect.'],
    news: [{ title: 'Tourism season peaks in the Pink City', summary: 'Jaipur sees a massive influx of tourists.', source: 'Rajasthan Patrika', url: '#' }],
    imageUrl: 'https://picsum.photos/seed/jaipur/600/400'
};


const weatherDatabase: Record<string, WeatherData> = {
  'London': londonData,
  'New York': newYorkData,
  'Tokyo': tokyoData,
  'Paris': parisData,
  'Berlin': berlinData,
  'Moscow': moscowData,
  'Beijing': beijingData,
  'Sydney': sydneyData,
  'Cairo': cairoData,
  'New Delhi': newDelhiData,
  'Mumbai': mumbaiData,
  'Kolkata': kolkataData,
  'Chennai': chennaiData,
  'Bengaluru': bengaluruData,
  'Hyderabad': hyderabadData,
  'Jaipur': jaipurData,
};

export function getWeatherData(location: string): WeatherData {
  return weatherDatabase[location] || londonData;
}

export function convertTemperature(temp: number, toUnit: Unit): number {
    if (toUnit === 'F') {
        return Math.round((temp * 9/5) + 32);
    }
    return temp; // Assumes input is always Celsius
}
