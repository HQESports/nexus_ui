import { Card, CardContent } from "@/components/ui/card"

interface GradientPreviewProps {
    gradientData: Record<number, string>
}

export function GradientPreview({ gradientData, }: GradientPreviewProps) {
    return (
        <div className="flex h-5 w-36 rounded overflow-hidden flex-shrink-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((level) => (
                <div
                    key={level}
                    className="flex-1 h-full"
                    style={{
                        backgroundColor: `rgb(${gradientData[level]})`,
                    }}
                />
            ))}
        </div>
    )
}
