"use client"

import * as React from 'react'
import { getWeatherData } from '@/lib/weather-data'
import type { Unit, WeatherData } from '@/lib/types'
import UnitToggle from '@/components/weather/unit-toggle'
import CurrentConditions from '@/components/weather/current-conditions'
import HourlyForecast from '@/components/weather/hourly-forecast'
import DailyForecast from '@/components/weather/daily-forecast'
import WeatherSummary from '@/components/weather/weather-summary'
import WeatherNews from '@/components/weather/weather-news'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Home() {
  const [location, setLocation] = React.useState('London')
  const [unit, setUnit] = React.useState<Unit>('C')
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null)
  const locations = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Moscow', 
    'Beijing', 'Sydney', 'Cairo', 'New Delhi', 'Mumbai', 'Kolkata',
    'Chennai', 'Bengaluru', 'Hyderabad', 'Jaipur'
  ];

  React.useEffect(() => {
    const data = getWeatherData(location)
    setWeatherData(data)
  }, [location])

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };

  if (!weatherData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
        <h1 className="text-xl font-bold tracking-tight text-primary-foreground-dark sm:text-2xl">
          Clear Sky
        </h1>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleLocationSelect} defaultValue={location}>
            <SelectTrigger className="w-[180px] sm:w-[200px]">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:p-8">
        <div className="lg:col-span-2 xl:col-span-3">
          <CurrentConditions data={weatherData.current} unit={unit} location={location} />
        </div>

        <div className="lg:col-span-2 xl:col-span-2">
          <DailyForecast data={weatherData.dailyForecast} unit={unit} />
        </div>
        
        <div className="md:col-span-2 lg:col-span-4 xl:col-span-5">
          <HourlyForecast data={weatherData.hourlyForecast} unit={unit} />
        </div>

        <div className="md:col-span-1 lg:col-span-2 xl:col-span-2">
           <WeatherSummary weatherData={weatherData} />
        </div>
        
        <div className="md:col-span-1 lg:col-span-2 xl:col-span-3">
            <WeatherNews news={weatherData.news} />
        </div>

      </main>
    </div>
  )
}
