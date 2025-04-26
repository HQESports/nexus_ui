"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload } from "lucide-react"
import Image from "next/image"
import { getServerApiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { createOrganization } from "../actions/organization"
import { useRouter } from "next/navigation"

export function CreateOrganizationDialog({ refresh }: { refresh: Function }) {
    const [open, setOpen] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {

        // Create FormData
        const formData = new FormData();
        formData.append("name", name);

        if (selectedFile) {
            // Append the original file with its filename preserved
            formData.append("image", selectedFile, selectedFile.name);
        }

        try {
            // Call server action
            await createOrganization(formData);

            // Success handling
            setOpen(false);
            resetForm();

            refresh()

            toast.success("Sucessfully created new organization!")
        } catch (error: any) {
            toast.error("Failed to create new organization!")
        } finally {
        }
    };

    const resetForm = () => {
        setName("")
        setImagePreview(null)
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen)
                if (!newOpen) resetForm()
            }}
        >
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Organization
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Organization</DialogTitle>
                        <DialogDescription>Add a new organization to your workspace.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="required">
                                Organization Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter organization name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Organization Image</Label>
                            <div className="flex flex-col items-center gap-4">
                                {imagePreview ? (
                                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                                        <Image
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Organization preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            className="absolute bottom-2 right-2"
                                            onClick={() => {
                                                setImagePreview(null)
                                                setSelectedFile(null)
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = ""
                                                }
                                            }}
                                        >
                                            Change
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed">
                                        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                        <Label
                                            htmlFor="image"
                                            className="mt-2 cursor-pointer rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground"
                                        >
                                            Select Image
                                        </Label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name.trim()}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}