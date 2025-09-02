import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import type { HourlyForecastItem, Unit } from '@/lib/types';
import { convertTemperature } from '@/lib/weather-data';
import WeatherIcon from './weather-icon';

interface HourlyForecastProps {
  data: HourlyForecastItem[];
  unit: Unit;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, unit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Hourly Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-4 shadow-sm"
                style={{ minWidth: '100px' }}
              >
                <p className="text-sm font-medium text-muted-foreground">{item.time}</p>
                <WeatherIcon condition={item.weatherConditions} className="h-8 w-8 text-primary" />
                <p className="text-lg font-bold">{convertTemperature(item.temperature, unit)}°</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
