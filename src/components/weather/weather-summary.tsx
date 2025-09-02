"use client"

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, LoaderCircle } from 'lucide-react';
import type { WeatherData } from '@/lib/types';
import { getSummary } from '@/app/actions';

interface WeatherSummaryProps {
  weatherData: WeatherData;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ weatherData }) => {
  const [summary, setSummary] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      const result = await getSummary({
        temperature: weatherData.current.temperature,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.windSpeed,
        weatherConditions: weatherData.current.weatherConditions,
        hourlyForecast: weatherData.hourlyForecast,
        dailyForecast: weatherData.dailyForecast,
        weatherAlerts: weatherData.weatherAlerts,
      });
      setSummary(result);
    });
  };

  return (
    <Card className="transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Sparkles className="h-5 w-5 text-muted-foreground" />
          AI Weather Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {summary ? (
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">{summary}</div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click the button to generate a concise, AI-powered summary of the weather forecast.
          </p>
        )}
        <Button onClick={handleGenerateSummary} disabled={isPending} className="w-full">
          {isPending ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isPending ? 'Generating...' : 'Generate Summary'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherSummary;
