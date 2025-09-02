import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Gauge, Wind } from 'lucide-react';
import type { CurrentWeather, Unit } from '@/lib/types';
import { convertTemperature } from '@/lib/weather-data';
import WeatherIcon from './weather-icon';

interface CurrentConditionsProps {
  data: CurrentWeather;
  unit: Unit;
  location: string;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({ data, unit, location }) => {
  const temp = convertTemperature(data.temperature, unit);

  return (
    <Card className="bg-card/70 backdrop-blur-sm transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
      <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
        <div className="flex items-center">
          <WeatherIcon condition={data.weatherConditions} className="mr-6 h-24 w-24 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">{location}</p>
            <p className="text-6xl font-bold">{temp}°</p>
            <p className="font-medium text-muted-foreground">{data.weatherConditions}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-x-8 gap-y-4 text-center sm:mt-0 sm:flex sm:flex-col sm:gap-y-6 sm:text-left">
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
      </CardContent>
    </Card>
  );
};

export default CurrentConditions;
