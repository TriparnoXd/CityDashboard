
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
import LocationSearch from '@/components/weather/location-search'
import CityCompareDialog from '@/components/weather/city-compare-dialog'
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
import { User, LogOut, LoaderCircle, Map } from 'lucide-react'
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase'
import { signOut } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

export default function DashboardPage() {
  const router = useRouter()
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  
  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user?.uid]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const [location, setLocation] = React.useState('London')
  const [unit, setUnit] = React.useState<Unit>('C')
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null)
  
  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  React.useEffect(() => {
    if (userData) {
      if (userData.location) setLocation(userData.location);
      if (userData.unit) setUnit(userData.unit);
    }
  }, [userData]);
  
  React.useEffect(() => {
    const data = getWeatherData(location.split(',')[0]) // Use only city name for mock data
    setWeatherData(data)
     if (userDocRef) {
      if (userData === null) {
        // Document does not exist, create it with UID
        setDoc(userDocRef, { uid: user?.uid, location, unit }, { merge: true });
      } else if (userData.location !== location) {
        // Document exists, update only location
        updateDoc(userDocRef, { location });
      }
    }
  }, [location, userDocRef, user?.uid, userData, unit]);

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };
  
  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
     if (userDocRef) {
      updateDoc(userDocRef, { unit: newUnit });
    }
  }

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  }

  if (isUserLoading || isUserDataLoading || !user || !weatherData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            CityDashboard
          </h1>
          <CityCompareDialog unit={unit} />
        </div>
        <div className="flex items-center gap-4">
          <LocationSearch onLocationSelect={handleLocationSelect} currentLocation={location} />
          <UnitToggle unit={unit} setUnit={handleUnitChange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
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
          <CurrentConditions data={weatherData.current} hourlyData={weatherData.hourlyForecast} unit={unit} location={location} />
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
        
        <div className="md-col-span-1 lg:col-span-2 xl:col-span-3">
            <WeatherNews news={weatherData.news} />
        </div>

      </main>
    </div>
  )
}
