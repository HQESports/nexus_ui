import { calculatePercentage, cn } from "@/lib/utils"

interface PercentStatCardProps {
    title: string
    subtitle: string
    value: number
    total: number
    color?: "blue" | "green" | "yellow" | "orange" | "purple" | "red" | "lime"
    className?: string
}

export function PercentStatCard({ title, subtitle, value, total, color = "blue", className }: PercentStatCardProps) {
    const colorMap = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        orange: "bg-orange-400",
        purple: "bg-purple-500",
        red: "bg-rose-600",
        lime: "bg-lime-500"
    }

    const barColor = colorMap[color]

    const percentage = calculatePercentage(value, total, 2)

    return (
        <div className={cn("rounded-lg bg-zinc-900 p-6 flex flex-col", className)}>
            <h2 className="font-bold text-white mb-1">{title}</h2>
            <p className="text-zinc-400 mb-6">{subtitle}</p>

            <div className="text-xl font-bold text-white mb-2">
                {typeof value === "number" ? value.toLocaleString() : value}
            </div>

            <p className="text-zinc-400 mb-4">
                {typeof percentage === "number" ? `${percentage}%` : percentage} of filtered matches
            </p>

            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full", barColor)}
                    style={{
                        width: typeof percentage === "number" ? `${Math.min(percentage * 2, 100)}%` : "25%",
                    }}
                />
            </div>
        </div>
    )
}
