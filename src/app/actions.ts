"use server";

import { generateWeatherSummary, type GenerateWeatherSummaryInput } from '@/ai/flows/generate-weather-summary';

export async function getSummary(input: GenerateWeatherSummaryInput): Promise<string> {
  try {
    const result = await generateWeatherSummary(input);
    return result.summary;
  } catch (error) {
    console.error("Error generating weather summary:", error);
    return "I'm sorry, but I was unable to generate a weather summary at this time. Please try again later.";
  }
}
