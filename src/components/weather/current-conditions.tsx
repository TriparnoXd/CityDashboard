import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Wind } from 'lucide-react';
import type { CurrentWeather, Unit, HourlyForecastItem } from '@/lib/types';
import { convertTemperature } from '@/lib/weather-data';
import WeatherIcon from './weather-icon';
import HourlyChart from './hourly-chart';

interface CurrentConditionsProps {
  data: CurrentWeather;
  hourlyData: HourlyForecastItem[];
  unit: Unit;
  location: string;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({ data, hourlyData, unit, location }) => {
  const temp = convertTemperature(data.temperature, unit);
  
  return (
    <Card className="bg-card/70 backdrop-blur-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary/30 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1">
          <div className="flex flex-col justify-between p-6">
            <div className="flex items-start">
              <WeatherIcon condition={data.weatherConditions} className="mr-6 h-24 w-24 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{location}</p>
                <p className="text-6xl font-bold">{temp}°</p>
                <p className="font-medium text-muted-foreground">{data.weatherConditions}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-left">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-xs text-muted-foreground">{data.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-accent" />
                 <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-xs text-muted-foreground">{data.windSpeed} kph</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-full p-4">
             <HourlyChart data={hourlyData} unit={unit} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentConditions;
