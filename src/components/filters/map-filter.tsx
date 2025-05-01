import { MAP_OPTIONS } from "@/lib/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface MapFilterSelectProps {
    defaultMap: string
    onMapChange: (map: string) => void
    isLoading: boolean
    value?: string
}

export default function MapFilterSelect({ defaultMap = "Baltic_Main", onMapChange, isLoading, value }: MapFilterSelectProps) {
    return (
        <Select onValueChange={onMapChange} defaultValue={defaultMap} disabled={isLoading} value={value ?? defaultMap}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select map" className="w-full" />
            </SelectTrigger>
            <SelectContent>
                {MAP_OPTIONS.map((map) => (
                    <SelectItem key={map.id} value={map.id}>
                        {map.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}