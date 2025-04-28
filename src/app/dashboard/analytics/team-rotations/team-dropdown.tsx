"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define the option type with image URL and name
export interface TeamDropdownOption {
    value: string
    label: string
    imageUrl: string
}

interface TeamDropdownProps {
    placeholder?: string
    options: TeamDropdownOption[]
    onChange?: (value: string) => void
    teamID: string | undefined
}

export default function TeamDropdown({
    placeholder = "Select a team...",
    options: propOptions,
    onChange,
    teamID
}: TeamDropdownProps) {
    if (!teamID) teamID = ""
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(teamID)

    const items = propOptions
    const selectedOption = items.find((option) => option.value === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedOption ? (
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={selectedOption.imageUrl || "/placeholder.svg"} alt={selectedOption.label} />
                                <AvatarFallback>{selectedOption.label.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{selectedOption.label}</span>
                        </div>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search teams..." />
                    <CommandList>
                        <CommandEmpty>No teams found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === value ? "" : currentValue
                                        setValue(newValue)
                                        onChange?.(newValue)
                                        setOpen(false)
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={option.imageUrl || "/placeholder.svg"} alt={option.label} />
                                            <AvatarFallback>{option.label.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{option.label}</span>
                                    </div>
                                    <Check className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
