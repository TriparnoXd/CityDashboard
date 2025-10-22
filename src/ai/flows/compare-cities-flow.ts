
'use server';

/**
 * @fileOverview Compares the weather of two cities and provides a travel recommendation, including flight search links.
 *
 * - compareCities - A function that generates the comparison.
 * - CompareCitiesInput - The input type for the compareCities function.
 * - CompareCitiesOutput - The return type for the compareCities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Tool to find flight information
const findFlightsTool = ai.defineTool(
  {
    name: 'findFlights',
    description: 'Finds flight information between two cities and returns search URLs.',
    inputSchema: z.object({
      originCity: z.string().describe('The starting city for the flight search.'),
      destinationCity: z.string().describe('The destination city for the flight search.'),
    }),
    outputSchema: z.object({
      flights: z.array(z.object({
        source: z.string().describe('The name of the flight search engine, e.g., Google Flights.'),
        url: z.string().url().describe('The direct URL to the flight search results page.'),
      })),
    }),
  },
  async ({ originCity, destinationCity }) => {
    const googleFlightsUrl = `https://www.google.com/flights?q=flights+from+${encodeURIComponent(originCity)}+to+${encodeURIComponent(destinationCity)}`;
    const skyscannerUrl = `https://www.skyscanner.com/transport/flights/${encodeURIComponent(originCity.substring(0, 4))}/${encodeURIComponent(destinationCity.substring(0, 4))}`;
    const kayakUrl = `https://www.kayak.com/flights/${encodeURIComponent(originCity)}-${encodeURIComponent(destinationCity)}`;
    
    return {
      flights: [
        { source: 'Google Flights', url: googleFlightsUrl },
        { source: 'Skyscanner', url: skyscannerUrl },
        { source: 'Kayak', url: kayakUrl },
      ],
    };
  }
);


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
export type CompareCitiesInput = z.infer<typeof CompareCitiesInputSchema>;

const CompareCitiesOutputSchema = z.object({
  recommendation: z.string().describe('A detailed, helpful, and friendly recommendation on whether it is a good idea to travel. It should be at least 3 sentences long and use markdown for formatting.'),
  flightInfo: z.array(z.object({
      source: z.string(),
      url: z.string().url(),
  })).optional().describe('An array of flight search engine links.'),
});
export type CompareCitiesOutput = z.infer<typeof CompareCitiesOutputSchema>;

export async function compareCities(input: CompareCitiesInput): Promise<CompareCitiesOutput> {
  return compareCitiesFlow(input);
}

const compareCitiesPrompt = ai.definePrompt({
  name: 'compareCitiesPrompt',
  input: {schema: CompareCitiesInputSchema},
  output: {schema: CompareCitiesOutputSchema},
  tools: [findFlightsTool],
  prompt: `You are a helpful and enthusiastic travel assistant. A user wants to know if traveling from {{cityA.name}} to {{cityB.name}} is a good idea based on the weather.

Here is the weather for {{cityA.name}}:
- Current: {{cityA.temperature}}°C, {{cityA.weatherConditions}}.
- Forecast: The week will see highs around {{cityA.dailyForecast.0.highTemperature}}°C and lows around {{cityA.dailyForecast.0.lowTemperature}}°C.

Here is the weather for {{cityB.name}}:
- Current: {{cityB.temperature}}°C, {{cityB.weatherConditions}}.
- Forecast: The week will see highs around {{cityB.dailyForecast.0.highTemperature}}°C and lows around {{cityB.dailyForecast.0.lowTemperature}}°C.

Based on this comparison, provide a detailed and friendly recommendation of at least a few sentences. Be creative and give the user a real sense of the travel choice. For example, "It looks like a fantastic time to escape the gloomy rain in {{cityA.name}} for some brilliant sunshine in {{cityB.name}}! The weather is much warmer and you'll be able to enjoy all the outdoor sights."

Finally, use the findFlights tool to search for flights from {{cityA.name}} to {{cityB.name}} and include the results in your response.
`,
});

const compareCitiesFlow = ai.defineFlow(
  {
    name: 'compareCitiesFlow',
    inputSchema: CompareCitiesInputSchema,
    outputSchema: CompareCitiesOutputSchema,
  },
  async input => {
    const {output} = await compareCitiesPrompt(input);
    return output!;
  }
);
