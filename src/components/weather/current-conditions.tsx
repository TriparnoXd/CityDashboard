import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Wind } from 'lucide-react';
import type { CurrentWeather, Unit } from '@/lib/types';
import { convertTemperature } from '@/lib/weather-data';
import WeatherIcon from './weather-icon';

interface CurrentConditionsProps {
  data: CurrentWeather;
  unit: Unit;
  location: string;
  imageUrl: string;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({ data, unit, location, imageUrl }) => {
  const temp = convertTemperature(data.temperature, unit);
  const aiHint = location.split(',')[0].toLowerCase().replace(' ', '');

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
          <div className="relative h-64 w-full">
            <Image 
              src={imageUrl}
              alt={`Image of ${location}`} 
              fill
              className="object-cover"
              data-ai-hint={aiHint}
              key={imageUrl}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentConditions;
