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
  summary: z.string().describe('A concise summary of the weather forecast.'),
});
export type GenerateWeatherSummaryOutput = z.infer<typeof GenerateWeatherSummaryOutputSchema>;

export async function generateWeatherSummary(input: GenerateWeatherSummaryInput): Promise<GenerateWeatherSummaryOutput> {
  return generateWeatherSummaryFlow(input);
}

const generateWeatherSummaryPrompt = ai.definePrompt({
  name: 'generateWeatherSummaryPrompt',
  input: {schema: GenerateWeatherSummaryInputSchema},
  output: {schema: GenerateWeatherSummaryOutputSchema},
  prompt: `Summarize the weather forecast based on the following information:\n\nCurrent Conditions:\nTemperature: {{temperature}}°C\nHumidity: {{humidity}}%\nWind Speed: {{windSpeed}} km/h\nConditions: {{weatherConditions}}\n\nHourly Forecast:\n{{#each hourlyForecast}}\n  {{time}}: {{temperature}}°C, {{weatherConditions}}\n{{/each}}\n\nDaily Forecast:\n{{#each dailyForecast}}\n  {{day}}: High {{highTemperature}}°C, Low {{lowTemperature}}°C, {{weatherConditions}}\n{{/each}}\n\n{{#if weatherAlerts}}\n  Weather Alerts:\n  {{#each weatherAlerts}}\n    - {{this}}\n  {{/each}}\n{{/if}}\n\nWrite a concise and easy-to-understand summary.`,
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
