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
import LocationSearch from '@/components/weather/location-search'

export default function Home() {
  const [location, setLocation] = React.useState('London')
  const [unit, setUnit] = React.useState<Unit>('C')
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null)

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
          <LocationSearch 
            selectedLocation={location}
            onLocationSelect={handleLocationSelect}
          />
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3">
          <CurrentConditions data={weatherData.current} unit={unit} location={location} />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <DailyForecast data={weatherData.dailyForecast} unit={unit} />
        </div>
        
        <div className="md:col-span-3 lg:col-span-4">
          <HourlyForecast data={weatherData.hourlyForecast} unit={unit} />
        </div>

        <div className="md:col-span-3 lg:col-span-2">
           <WeatherSummary weatherData={weatherData} />
        </div>
        
        <div className="md:col-span-3 lg:col-span-2">
            <WeatherNews news={weatherData.news} />
        </div>

      </main>
    </div>
  )
}
