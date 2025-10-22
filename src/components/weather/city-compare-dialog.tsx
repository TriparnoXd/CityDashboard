
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
import { Map, ArrowRight, LoaderCircle, Sparkles, Calendar, ExternalLink } from "lucide-react"
import LocationSearch from "./location-search"
import { getWeatherData, convertTemperature } from "@/lib/weather-data"
import type { WeatherData, Unit } from "@/lib/types"
import { getTravelRecommendation } from "@/app/actions"
import WeatherIcon from "./weather-icon"
import { Separator } from "../ui/separator"
import type { CompareCitiesOutput } from "@/ai/flows/compare-cities-flow"

interface CityCompareDialogProps {
    unit: Unit;
}

export default function CityCompareDialog({ unit }: CityCompareDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [cityA, setCityA] = React.useState<string | null>(null)
  const [cityB, setCityB] = React.useState<string | null>(null)
  const [weatherA, setWeatherA] = React.useState<WeatherData | null>(null)
  const [weatherB, setWeatherB] = React.useState<WeatherData | null>(null)
  const [result, setResult] = React.useState<CompareCitiesOutput | null>(null)
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
    if (weatherA && weatherB && cityA && cityB) {
      startTransition(async () => {
        const result = await getTravelRecommendation({
          cityA: {
            name: cityA,
            temperature: weatherA.current.temperature,
            weatherConditions: weatherA.current.weatherConditions,
            dailyForecast: weatherA.dailyForecast,
          },
          cityB: {
            name: cityB,
            temperature: weatherB.current.temperature,
            weatherConditions: weatherB.current.weatherConditions,
            dailyForecast: weatherB.dailyForecast,
          },
        })
        setResult(result);
      })
    } else {
        setResult(null);
    }
  }, [weatherA, weatherB, cityA, cityB])
  
  const handleReset = () => {
    setCityA(null);
    setCityB(null);
    setWeatherA(null);
    setWeatherB(null);
    setResult(null);
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Map className="h-5 w-5" />
          <span className="sr-only">Compare Cities</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>City Weather Comparison</DialogTitle>
          <DialogDescription>
            Select two cities to compare their weather and get an AI travel recommendation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] items-center">
          <LocationSearch onLocationSelect={setCityA} currentLocation={cityA || "Select City A"} />
          <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto" />
          <LocationSearch onLocationSelect={setCityB} currentLocation={cityB || "Select City B"} />
        </div>
        
        {isPending && (
            <div className="flex items-center justify-center p-8">
                <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}
        
        {!isPending && result?.recommendation && (
            <Card>
                <CardHeader className="flex-row items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">AI Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                    {result.flightInfo && result.flightInfo.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Check Flights:</h4>
                            <div className="flex gap-2 flex-wrap">
                                {result.flightInfo.map((flight, index) => (
                                    <Button key={index} variant="outline" size="sm" asChild>
                                        <a href={flight.url} target="_blank" rel="noopener noreferrer">
                                            {flight.source}
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}

        {!isPending && weatherA && weatherB && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        7-Day Forecast Comparison
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-[1fr_1fr] gap-4">
                        <div>
                             <h3 className="font-semibold text-center mb-2">{cityA}</h3>
                             <ul className="space-y-1">
                                {weatherA.dailyForecast.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50">
                                            <p className="w-1/4 font-medium text-sm">{item.day}</p>
                                            <div className="flex w-1/4 items-center justify-center">
                                                <WeatherIcon condition={item.weatherConditions} className="h-5 w-5 text-primary" />
                                            </div>
                                            <p className="w-1/2 text-right text-sm font-medium text-muted-foreground">
                                                <span className="text-foreground">{convertTemperature(item.highTemperature, unit)}°</span>
                                                {' / '}
                                                <span>{convertTemperature(item.lowTemperature, unit)}°</span>
                                            </p>
                                        </li>
                                       {index < weatherA.dailyForecast.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                             </ul>
                        </div>
                         <div>
                             <h3 className="font-semibold text-center mb-2">{cityB}</h3>
                             <ul className="space-y-1">
                                {weatherB.dailyForecast.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="flex items-center justify-between p-1.5 rounded-md hover:bg-muted/50">
                                            <p className="w-1/4 font-medium text-sm">{item.day}</p>
                                            <div className="flex w-1/4 items-center justify-center">
                                                <WeatherIcon condition={item.weatherConditions} className="h-5 w-5 text-primary" />
                                            </div>
                                            <p className="w-1/2 text-right text-sm font-medium text-muted-foreground">
                                                <span className="text-foreground">{convertTemperature(item.highTemperature, unit)}°</span>
                                                {' / '}
                                                <span>{convertTemperature(item.lowTemperature, unit)}°</span>
                                            </p>
                                        </li>
                                        {index < weatherB.dailyForecast.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))}
                             </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
        
        {(cityA || cityB) && !isPending && (
            <Button variant="outline" size="sm" onClick={handleReset} className="w-fit mt-4">
                Reset
            </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
