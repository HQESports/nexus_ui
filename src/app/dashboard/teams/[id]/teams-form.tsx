"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { createTeam, updateTeam, deleteTeam } from "@/app/actions/teams"
import type { Team, Player } from "@/lib/models"
import { teamToFormData, convertTeamForApi } from "@/lib/utils"

interface TeamFormProps {
    initialTeam?: Team
    mode?: "create" | "update"
    onSuccess?: () => void
}

const TeamForm = ({ initialTeam, mode = "create", onSuccess }: TeamFormProps) => {
    const emptyTeam: Team = {
        id: "",
        name: "",
        imageUrl: "",
        esportTag: "",
        searchCount: 2,
        players: [
            {
                name: "",
                isPriority: false,
                liveServerIGN: "",
                eventServerIGN: "",
            },
        ],
    }

    const [team, setTeam] = useState<Team>(initialTeam || emptyTeam)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    useEffect(() => {
        if (initialTeam) {
            setTeam(initialTeam)
            // If team has an image URL, show it in the preview
            if (initialTeam.imageUrl) {
                setImagePreview(initialTeam.imageUrl)
            }
        }
    }, [initialTeam])

    const updateTeamField = (field: keyof Team, value: any) => {
        setTeam({ ...team, [field]: value })
    }

    const updatePlayer = (index: number, field: keyof Player, value: any) => {
        const updatedPlayers = [...team.players]
        updatedPlayers[index] = { ...updatedPlayers[index], [field]: value }
        setTeam({ ...team, players: updatedPlayers })
    }

    const addPlayer = () => {
        if (team.players.length < 4) {
            setTeam({
                ...team,
                players: [
                    ...team.players,
                    {
                        name: "",
                        isPriority: false,
                        liveServerIGN: "",
                        eventServerIGN: "",
                    },
                ],
            })
        }
    }

    const removePlayer = (index: number) => {
        if (team.players.length > 1) {
            const updatedPlayers = [...team.players]
            updatedPlayers.splice(index, 1)
            setTeam({ ...team, players: updatedPlayers })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            const fileUrl = URL.createObjectURL(file)
            setImagePreview(fileUrl)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // Create FormData object with team data and image
            const formData = teamToFormData(convertTeamForApi(team), imageFile)

            let result
            if (mode === "create") {
                result = await createTeam(formData)
            } else {
                result = await updateTeam(team.id, formData)
            }

            if (result.success) {
                toast(mode === "create" ? "Team Created" : "Team Updated", {
                    description: `${team.name} has been ${mode === "create" ? "created" : "updated"} successfully.`,
                })

                if (onSuccess) {
                    onSuccess()
                }
            } else {
                setError(result.error || "An error occurred")
                toast.error("Error", {
                    description: result.error || "An error occurred while saving the team.",
                })
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
            setError(errorMessage)
            toast.error("Error", {
                description: errorMessage,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!team.id) return
        setShowDeleteDialog(true)
    }

    const confirmDelete = async () => {
        if (!team.id) return

        setIsSubmitting(true)
        setError(null)

        try {
            const result = await deleteTeam(team.id)

            if (result.success) {
                toast("Team Deleted", {
                    description: `${team.name} has been deleted successfully.`,
                })

                if (onSuccess) {
                    onSuccess()
                }
            } else {
                setError(result.error || "An error occurred")
                toast.error("Error", {
                    description: result.error || "An error occurred while deleting the team.",
                })
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
            setError(errorMessage)
            toast.error("Error", {
                description: errorMessage,
            })
        } finally {
            setIsSubmitting(false)
            setShowDeleteDialog(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{mode === "create" ? "Create Team" : "Edit Team"}</CardTitle>
                <CardDescription>
                    {mode === "create"
                        ? "Enter your team details and player information"
                        : "Update your team details and player information"}
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Team Information */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <h3 className="text-lg font-medium">Team Information</h3>
                            <Separator className="flex-1 ml-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="teamName">Team Name</Label>
                                <Input
                                    id="teamName"
                                    value={team.name}
                                    onChange={(e) => updateTeamField("name", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="esportTag">Esport Tag</Label>
                                <Input
                                    id="esportTag"
                                    value={team.esportTag}
                                    onChange={(e) => updateTeamField("esportTag", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageUpload">Team Logo</Label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <Button type="button" variant="outline" onClick={triggerFileInput} className="w-full">
                                        {imagePreview ? "Change Image" : "Choose Image"}
                                    </Button>
                                    {imagePreview && (
                                        <div className="mt-2 relative w-32 h-32 border rounded-md overflow-hidden">
                                            <Image
                                                src={imagePreview || "/placeholder.svg"}
                                                alt="Team logo preview"
                                                fill
                                                className="object-contain"
                                                unoptimized={imagePreview.startsWith("blob:")}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="searchCount">Search Count</Label>
                                <Select
                                    value={team.searchCount.toString()}
                                    onValueChange={(value) => updateTeamField("searchCount", Number.parseInt(value) as 2 | 3 | 4)}
                                >
                                    <SelectTrigger id="searchCount">
                                        <SelectValue placeholder="Select count" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Player Information */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <h3 className="text-lg font-medium">Player Information</h3>
                            <Separator className="flex-1 ml-3" />
                        </div>
                        {team.players.map((player, index) => (
                            <Card key={index} className="overflow-hidden border-muted">
                                <CardContent className="p-4 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`playerName-${index}`}>Player Name</Label>
                                            <Input
                                                id={`playerName-${index}`}
                                                value={player.name}
                                                onChange={(e) => updatePlayer(index, "name", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`liveServerIGN-${index}`}>Live Server IGN</Label>
                                            <Input
                                                id={`liveServerIGN-${index}`}
                                                value={player.liveServerIGN}
                                                onChange={(e) => updatePlayer(index, "liveServerIGN", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`eventServerIGN-${index}`}>Event Server IGN</Label>
                                            <Input
                                                id={`eventServerIGN-${index}`}
                                                value={player.eventServerIGN}
                                                onChange={(e) => updatePlayer(index, "eventServerIGN", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2 pt-6">
                                            <Checkbox
                                                id={`isPriority-${index}`}
                                                checked={player.isPriority}
                                                onCheckedChange={(checked) => updatePlayer(index, "isPriority", checked === true)}
                                            />
                                            <Label htmlFor={`isPriority-${index}`} className="font-normal">
                                                Priority Player
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removePlayer(index)}
                                            disabled={team.players.length <= 1}
                                        >
                                            Remove Player
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addPlayer}
                            disabled={team.players.length >= 4}
                            className="w-full"
                        >
                            Add Player
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2 mt-6">
                    {mode === "update" && (
                        <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                            Delete Team
                        </Button>
                    )}
                    <Button type="submit" className={mode === "create" ? "w-full" : "ml-auto"} disabled={isSubmitting}>
                        {isSubmitting
                            ? mode === "create"
                                ? "Creating..."
                                : "Updating..."
                            : mode === "create"
                                ? "Create Team"
                                : "Update Team"}
                    </Button>
                </CardFooter>
            </form>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the team "{team.name}" and remove all
                            associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}

export default TeamForm
