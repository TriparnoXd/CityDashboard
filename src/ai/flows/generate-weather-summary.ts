'use server';

/**
 * @fileOverview Summarizes the weather forecast into a concise, human-readable paragraph.
 *
 * - generateWeatherSummary - A function that generates the weather summary.
 * - GenerateWeatherSummaryInput - The input type for the generateWeatherSummary function.
 * - GenerateWeatherSummaryOutput - The return type for the generateWeatherSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWeatherSummaryInputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity percentage.'),
  windSpeed: z.number().describe('The current wind speed in kilometers per hour.'),
  weatherConditions: z.string().describe('A description of the current weather conditions, e.g., sunny, cloudy, rainy.'),
  hourlyForecast: z.array(z.object({
    time: z.string().describe('The time of the forecast.'),
    temperature: z.number().describe('The temperature in Celsius.'),
    weatherConditions: z.string().describe('A description of the weather conditions, e.g., sunny, cloudy, rainy.'),
  })).describe('An array of hourly forecasts for the next 24 hours.'),
  dailyForecast: z.array(z.object({
    day: z.string().describe('The day of the forecast.'),
    highTemperature: z.number().describe('The high temperature in Celsius.'),
    lowTemperature: z.number().describe('The low temperature in Celsius.'),
    weatherConditions: z.string().describe('A description of the weather conditions, e.g., sunny, cloudy, rainy.'),
  })).describe('An array of daily forecasts for the next 7 days.'),
  weatherAlerts: z.array(z.string()).optional().describe('An optional array of weather alerts.'),
});
export type GenerateWeatherSummaryInput = z.infer<typeof GenerateWeatherSummaryInputSchema>;

const GenerateWeatherSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, well-formatted summary of the weather forecast using markdown for structure (headings, lists).'),
});
export type GenerateWeatherSummaryOutput = z.infer<typeof GenerateWeatherSummaryOutputSchema>;

export async function generateWeatherSummary(input: GenerateWeatherSummaryInput): Promise<GenerateWeatherSummaryOutput> {
  return generateWeatherSummaryFlow(input);
}

const generateWeatherSummaryPrompt = ai.definePrompt({
  name: 'generateWeatherSummaryPrompt',
  input: {schema: GenerateWeatherSummaryInputSchema},
  output: {schema: GenerateWeatherSummaryOutputSchema},
  prompt: `Generate a weather summary based on the following data. Format the output using markdown with headings for "Now", "Next 24 Hours", and "Next 7 Days". Use bullet points for key details.

Current Conditions:
- Temperature: {{temperature}}°C
- Humidity: {{humidity}}%
- Wind: {{windSpeed}} km/h
- Conditions: {{weatherConditions}}

Hourly Forecast:
{{#each hourlyForecast}}
- {{time}}: {{temperature}}°C, {{weatherConditions}}
{{/each}}

Daily Forecast:
{{#each dailyForecast}}
- {{day}}: High {{highTemperature}}°C, Low {{lowTemperature}}°C, {{weatherConditions}}
{{/each}}

{{#if weatherAlerts}}
Weather Alerts:
{{#each weatherAlerts}}
- {{this}}
{{/each}}
{{/if}}

Your summary should be clear, concise, and easy to read.`,
});

const generateWeatherSummaryFlow = ai.defineFlow(
  {
    name: 'generateWeatherSummaryFlow',
    inputSchema: GenerateWeatherSummaryInputSchema,
    outputSchema: GenerateWeatherSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateWeatherSummaryPrompt(input);
    return output!;
  }
);
