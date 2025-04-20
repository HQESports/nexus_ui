"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapDistribution } from "@/app/actions/metrics"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface MapDistributionChartProps {
    distribution: MapDistribution;
    title?: string;
    description?: string;
}

export const MapDistributionChart = ({
    distribution,
    title = "Map Distribution",
    description = "Number of matches played on each map"
}: MapDistributionChartProps) => {
    const chartData = [
        { map: "Erangel", count: distribution.Baltic_Main, fill: "hsl(var(--green-color))" },
        { map: "Miramar", count: distribution.Desert_Main, fill: "hsl(var(--orange-color))" },
        { map: "Rondo", count: distribution.Neon_Main, fill: "hsl(var(--purple-color))" },
        { map: "Taego", count: distribution.Tiger_Main, fill: "hsl(var(--lime-color))" },
        { map: "Vikendi", count: distribution.DihorOtok_Main, fill: "hsl(var(--blue-color))" },
        { map: "Deston", count: distribution.Kiki_Main, fill: "hsl(var(--red-color))" },
    ]

    const chartConfig = {
        count: {
            label: "Matches",
            color: "#2563eb",
        },
    } satisfies ChartConfig

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-medium text-white">{title}</CardTitle>
                {description && <CardDescription className="text-sm text-gray-400">{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="map"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--chart-1)" radius={6} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}