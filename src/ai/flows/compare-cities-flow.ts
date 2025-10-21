
'use server';

/**
 * @fileOverview Compares the weather of two cities and provides a travel recommendation.
 *
 * - compareCities - A function that generates the comparison.
 * - CompareCitiesInput - The input type for the compareCities function.
 * - CompareCitiesOutput - The return type for the compareCities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  recommendation: z.string().describe('A concise, helpful, and friendly recommendation on whether it is a good idea to travel from City A to City B based on the weather. Use markdown for simple formatting if needed.'),
});
export type CompareCitiesOutput = z.infer<typeof CompareCitiesOutputSchema>;

export async function compareCities(input: CompareCitiesInput): Promise<CompareCitiesOutput> {
  return compareCitiesFlow(input);
}

const compareCitiesPrompt = ai.definePrompt({
  name: 'compareCitiesPrompt',
  input: {schema: CompareCitiesInputSchema},
  output: {schema: CompareCitiesOutputSchema},
  prompt: `You are a helpful travel assistant. A user wants to know if traveling from {{cityA.name}} to {{cityB.name}} is a good idea based on the weather.

Here is the weather for {{cityA.name}}:
- Current: {{cityA.temperature}}°C, {{cityA.weatherConditions}}.
- Forecast: Generally, the week will see highs around {{cityA.dailyForecast.0.highTemperature}}°C and lows around {{cityA.dailyForecast.0.lowTemperature}}°C.

Here is the weather for {{cityB.name}}:
- Current: {{cityB.temperature}}°C, {{cityB.weatherConditions}}.
- Forecast: Generally, the week will see highs around {{cityB.dailyForecast.0.highTemperature}}°C and lows around {{cityB.dailyForecast.0.lowTemperature}}°C.

Based on this comparison, provide a short, friendly, and helpful recommendation. For example, "It looks like a great time to escape the rain in {{cityA.name}} for some sunshine in {{cityB.name}}!" or "The weather is quite similar in both cities, so it's a perfect time for a trip!".
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
