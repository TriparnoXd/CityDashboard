
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, ArrowRight, LoaderCircle, Sparkles } from "lucide-react"
import LocationSearch from "./location-search"
import { getWeatherData } from "@/lib/weather-data"
import type { WeatherData } from "@/lib/types"
import { getTravelRecommendation } from "@/app/actions"

export default function CityCompareDialog() {
  const [open, setOpen] = React.useState(false)
  const [cityA, setCityA] = React.useState<string | null>(null)
  const [cityB, setCityB] = React.useState<string | null>(null)
  const [weatherA, setWeatherA] = React.useState<WeatherData | null>(null)
  const [weatherB, setWeatherB] = React.useState<WeatherData | null>(null)
  const [recommendation, setRecommendation] = React.useState<string>("")
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (cityA) {
      setWeatherA(getWeatherData(cityA.split(',')[0]))
    }
  }, [cityA])

  React.useEffect(() => {
    if (cityB) {
      setWeatherB(getWeatherData(cityB.split(',')[0]))
    }
  }, [cityB])

  React.useEffect(() => {
    if (weatherA && weatherB) {
      startTransition(async () => {
        const result = await getTravelRecommendation({
          cityA: {
            name: cityA!,
            temperature: weatherA.current.temperature,
            weatherConditions: weatherA.current.weatherConditions,
            dailyForecast: weatherA.dailyForecast,
          },
          cityB: {
            name: cityB!,
            temperature: weatherB.current.temperature,
            weatherConditions: weatherB.current.weatherConditions,
            dailyForecast: weatherB.dailyForecast,
          },
        })
        setRecommendation(result)
      })
    } else {
        setRecommendation("")
    }
  }, [weatherA, weatherB, cityA, cityB])
  
  const handleReset = () => {
    setCityA(null);
    setCityB(null);
    setWeatherA(null);
    setWeatherB(null);
    setRecommendation("");
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Map className="h-5 w-5" />
          <span className="sr-only">Compare Cities</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>City Weather Comparison</DialogTitle>
          <DialogDescription>
            Select two cities to compare their weather and get an AI travel recommendation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">From</h3>
            <LocationSearch onLocationSelect={setCityA} currentLocation={cityA || "Select City A"} />
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">To</h3>
            <LocationSearch onLocationSelect={setCityB} currentLocation={cityB || "Select City B"} />
          </div>
        </div>
        
        {isPending && (
            <div className="flex items-center justify-center p-8">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        
        {!isPending && recommendation && (
            <Card>
                <CardHeader className="flex-row items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">AI Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{recommendation}</p>
                </CardContent>
            </Card>
        )}
        
        {(cityA || cityB) && (
            <Button variant="outline" size="sm" onClick={handleReset} className="w-fit">
                Reset
            </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
