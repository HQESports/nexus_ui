"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { DEFAULT_CANVAS_SIZE, DEFAULT_MAP_OPTION, MAP_OPTIONS, PARAM_NAMES, PUBG_MAP_SCALE, PUBG_MAP_SIZE } from "@/lib/constants"
import { DropspotLocation } from "@/lib/models"
import { set } from "date-fns"
import { CheckCircle, Delete, Plus, PlusCircle } from "lucide-react"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SpotsManagerCanvas = dynamic(() => import('./spots-manager-canvas'), { ssr: false })

interface SpotsManagerWrapperProps {
    map: string
    dropspotLocations: DropspotLocation[]
}

export default function SpotsManagerWrapper({ map, dropspotLocations }: SpotsManagerWrapperProps) {
    const [dropspotLocationsState, setDropspotLocationsState] = useState<DropspotLocation[]>(dropspotLocations);
    const [selectedDropspotIndex, setSelectedDropspotIndex] = useState<number | undefined>(undefined);

    const searchParams = useSearchParams();
    const router = useRouter();


    const handleMapChange = (selectedMap: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(PARAM_NAMES.MAP, selectedMap);

        router.push(`?${params.toString()}`, { scroll: false })
    };

    const handleCreateDropspot = () => {
        const newDropspot: DropspotLocation = {
            id: undefined,
            map_name: map,
            names: [""],
            x: PUBG_MAP_SIZE / 2,
            y: PUBG_MAP_SIZE / 2,
        };

        const newDropspots = [...dropspotLocationsState, newDropspot];
        setDropspotLocationsState(newDropspots);
        setSelectedDropspotIndex(newDropspots.length - 1);
    };

    const handleSaveDropspots = () => {
    }

    const handleAddName = () => {
        const newDropspots = [...dropspotLocationsState];
        if (selectedDropspotIndex !== undefined) {
            newDropspots[selectedDropspotIndex].names.push("");
            setDropspotLocationsState(newDropspots);
        }
    }

    const handleRemoveDropspotName = (index: number) => {
        const newDropspots = [...dropspotLocationsState];
        if (selectedDropspotIndex !== undefined && newDropspots[selectedDropspotIndex].names.length > 1) {
            newDropspots[selectedDropspotIndex].names.splice(index, 1);
            setDropspotLocationsState(newDropspots);
        }
    }

    const handleSelectDropspotIndex = (index: number) => {
        if (selectedDropspotIndex === index) {
            setSelectedDropspotIndex(undefined);
        } else {
            setSelectedDropspotIndex(index);
        }
    }

    const handlePosChange = (index: number, x: number, y: number) => {
        const newDropspots = [...dropspotLocationsState];
        newDropspots[index].x = x / PUBG_MAP_SCALE;
        newDropspots[index].y = y / PUBG_MAP_SCALE;
        setDropspotLocationsState(newDropspots);
    }

    useEffect(() => {
    }, [dropspotLocationsState]);

    return (
        <SidebarProvider>
            <div className="flex w-full overflow-hidden">
                <div className="flex-1 flex items-center justify-center">
                    <div className="min-w-[600px] flex items-center justify-center">
                        <SpotsManagerCanvas map={map} dropspotLocations={dropspotLocationsState} handlePosChange={handlePosChange} handleDropspotSelect={handleSelectDropspotIndex} />
                    </div>
                </div>
                <Sidebar side="right" className="border-l">
                    <SidebarHeader className="border-b">
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="text-2xl font-bold">Spots Manager</h1>
                        </div>
                    </SidebarHeader>
                    <SidebarGroup className="space-y-2 border-b">
                        <Label>Map Selection</Label>
                        <Select onValueChange={handleMapChange} value={map}>
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
                        <Label>Create & Save</Label>

                        <Button variant="outline" className="w-full" onClick={handleCreateDropspot}>
                            <PlusCircle className="h-4 w-4" />
                            Create Dropspot
                        </Button>
                    </SidebarGroup>
                    {selectedDropspotIndex !== undefined && (
                        <SidebarGroup className="space-y-2">
                            <Label>Selected Dropspot</Label>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <p>X:{dropspotLocationsState[selectedDropspotIndex].x.toLocaleString()}</p>
                                <p>Y:{dropspotLocationsState[selectedDropspotIndex].y.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <Label>Dropspot Nanes</Label>
                                <Button variant="outline" size="icon" onClick={handleAddName}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {dropspotLocationsState[selectedDropspotIndex].names.map((name, index) => (
                                <div key={index} className="flex items-center justify-between space-x-2">
                                    <Input
                                        value={name}
                                        onChange={(value) => {
                                            const newDropspots = [...dropspotLocationsState];
                                            newDropspots[selectedDropspotIndex].names[index] = value.target.value;
                                            setDropspotLocationsState(newDropspots);
                                        }} />
                                    <Button variant="outline" size="icon" onClick={() => handleRemoveDropspotName(index)}>
                                        <Delete />
                                    </Button>
                                </div>
                            ))}
                        </SidebarGroup>
                    )}
                </Sidebar>
            </div>
        </SidebarProvider >
    )
}