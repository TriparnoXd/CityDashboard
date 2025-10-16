
"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [location, setLocation] = React.useState('London')
  const [unit, setUnit] = React.useState<Unit>('C')
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null)
  const locations = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Moscow', 
    'Beijing', 'Sydney', 'Cairo', 'New Delhi', 'Mumbai', 'Kolkata',
    'Chennai', 'Bengaluru', 'Hyderabad', 'Jaipur'
  ];

  const dummyUser = {
    name: "Test User",
    email: "test@example.com",
    avatarUrl: `https://i.pravatar.cc/150?u=test@example.com`
  }

  React.useEffect(() => {
    const data = getWeatherData(location)
    setWeatherData(data)
  }, [location])

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };
  
  const handleLogout = () => {
    router.push('/');
  }

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
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          City Pulse
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={dummyUser.avatarUrl} alt={dummyUser.name} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{dummyUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {dummyUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:p-8">
        <div className="lg:col-span-2 xl:col-span-3">
          <CurrentConditions data={weatherData.current} unit={unit} location={location} imageUrl={weatherData.imageUrl} />
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
