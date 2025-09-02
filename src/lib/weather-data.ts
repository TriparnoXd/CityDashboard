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
  ]
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
  ]
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
  ]
};


const weatherDatabase: Record<string, WeatherData> = {
  'London': londonData,
  'New York': newYorkData,
  'Tokyo': tokyoData,
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
