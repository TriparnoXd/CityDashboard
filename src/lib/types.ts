export type Unit = 'C' | 'F';

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherConditions: string;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherConditions: string;
}

export interface DailyForecastItem {
  day: string;
  highTemperature: number;
  lowTemperature: number;
  weatherConditions: string;
}

export interface NewsArticle {
    title: string;
    summary: string;
    source: string;
    url: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourlyForecast: HourlyForecastItem[];
  dailyForecast: DailyForecastItem[];
  weatherAlerts: string[];
  news: NewsArticle[];
}

export interface Location {
  name: string;
  country: string;
}
