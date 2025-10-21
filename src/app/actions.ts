
"use server";

import { generateWeatherSummary, type GenerateWeatherSummaryInput } from '@/ai/flows/generate-weather-summary';
import { compareCities, type CompareCitiesInput } from '@/ai/flows/compare-cities-flow';
import { z } from 'zod';

const CityWeatherInputSchema = z.object({
  name: z.string().describe("The city's name."),
  temperature: z.number().describe('The current temperature in Celsius.'),
  weatherConditions: z.string().describe('A description of the current weather conditions, e.g., sunny, cloudy, rainy.'),
  dailyForecast: z.array(z.object({
    day: z.string(),
    highTemperature: z.number(),
    lowTemperature: z.number(),
    weatherConditions: z.string(),
  })).describe("The 7-day forecast for the city."),
});

const CompareCitiesInputSchema = z.object({
  cityA: CityWeatherInputSchema.describe("The weather data for the origin city."),
  cityB: CityWeatherInputSchema.describe("The weather data for the destination city."),
});

export async function getSummary(input: GenerateWeatherSummaryInput): Promise<string> {
  try {
    const result = await generateWeatherSummary(input);
    return result.summary;
  } catch (error) {
    console.error("Error generating weather summary:", error);
    return "I'm sorry, but I was unable to generate a weather summary at this time. Please try again later.";
  }
}

export async function getTravelRecommendation(input: CompareCitiesInput): Promise<string> {
  try {
    const result = await compareCities(input);
    return result.recommendation;
  } catch (error) {
    console.error("Error generating travel recommendation:", error);
    return "I'm sorry, but I was unable to generate a travel recommendation at this time. Please try again later.";
  }
}


export async function getPlacePredictions(input: string) {
  if (!process.env.PLACES_API_KEY) {
    console.error('Places API key is not configured.');
    return [];
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${process.env.PLACES_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== 'OK') {
      console.error('Places API Error:', data.error_message || data.status);
      return [];
    }
    return data.predictions.map((p: any) => ({
        id: p.place_id,
        name: p.description,
    }));
  } catch (error) {
    console.error('Failed to fetch place predictions:', error);
    return [];
  }
}
