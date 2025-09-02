import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import type { DailyForecastItem, Unit } from '@/lib/types';
import { convertTemperature } from '@/lib/weather-data';
import WeatherIcon from './weather-icon';
import { Separator } from '../ui/separator';

interface DailyForecastProps {
  data: DailyForecastItem[];
  unit: Unit;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, unit }) => {
  return (
    <Card className="transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          7-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <li className="flex items-center justify-between p-2">
                <p className="w-1/4 font-medium">{item.day}</p>
                <div className="flex w-1/4 items-center justify-center">
                  <WeatherIcon condition={item.weatherConditions} className="h-6 w-6 text-primary" />
                </div>
                <p className="w-1/2 text-right font-medium text-muted-foreground">
                  <span className="text-foreground">{convertTemperature(item.highTemperature, unit)}°</span>
                  {' / '}
                  <span>{convertTemperature(item.lowTemperature, unit)}°</span>
                </p>
              </li>
              {index < data.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DailyForecast;
