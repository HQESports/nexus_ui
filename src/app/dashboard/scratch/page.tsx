"use client"

import { DateRangePicker } from "@/components/ui/date-range-picker";

export default function Scratch() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Scratch Page</h1>
            <p className="text-gray-600">This is a placeholder for your scratch page.</p>
            <DateRangePicker
                onUpdate={(values) => console.log(values)}
                initialDateFrom="2023-01-01"
                initialDateTo="2023-12-31"
                align="center"
                locale="en-GB"
                showCompare={false}
            />
        </div>
    )
}