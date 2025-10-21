"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { HourlyForecastItem, Unit } from "@/lib/types"
import { convertTemperature } from "@/lib/weather-data"

interface HourlyChartProps {
  data: HourlyForecastItem[]
  unit: Unit
}

const HourlyChart: React.FC<HourlyChartProps> = ({ data, unit }) => {
  const chartData = data.map(item => ({
    time: item.time,
    temperature: convertTemperature(item.temperature, unit),
  }));

  const chartConfig = {
    temperature: {
      label: `Temperature (°${unit})`,
      color: "hsl(var(--primary))",
    },
  }

  return (
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: -20,
            right: 10,
            top: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}°`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent 
                indicator="dot"
                labelFormatter={(label, payload) => payload?.[0]?.payload.time}
            />}
          />
          <defs>
            <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-temperature)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-temperature)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="temperature"
            type="natural"
            fill="url(#fillTemperature)"
            fillOpacity={0.4}
            stroke="var(--color-temperature)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
  )
}

export default HourlyChart
