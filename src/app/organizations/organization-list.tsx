"use client"

import { useEffect, useState } from "react"
import { Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { CreateOrganizationDialog } from "./create-organization-dialog"
import { useRouter } from "next/navigation"


export interface Organization {
    id: string
    name: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

interface OrganizationListProps {
    organizations: Organization[]
}

export default function OrganizationList({ organizations: initialOrganizations = [] }: OrganizationListProps) {
    const [organizations, setOrganizations] = useState(initialOrganizations)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter();

    useEffect(() => {
        setOrganizations(initialOrganizations);
    }, [initialOrganizations]);

    const refresh = () => {
        router.refresh();
    };

    const filteredOrganizations = organizations.filter((org) =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search organizations..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <CreateOrganizationDialog refresh={refresh} />
            </div>

            {/* Modified grid layout with improved spacing and more columns */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredOrganizations.map((organization) => (
                    <OrganizationCard
                        key={organization.id}
                        organization={organization}
                    />
                ))}
            </div>

            {filteredOrganizations.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mt-2 text-lg font-semibold">No organizations found</h3>
                    <p className="mb-4 mt-1 text-sm text-muted-foreground">
                        {organizations.length === 0
                            ? "Add your first organization to get started"
                            : "Try adjusting your search query"}
                    </p>
                    {organizations.length === 0 && <CreateOrganizationDialog refresh={refresh} />}
                </div>
            )}
        </div>
    )
}

interface OrganizationCardProps {
    organization: Organization
}

function OrganizationCard({ organization }: OrganizationCardProps) {
    const formattedDate = new Date(organization.createdAt).toLocaleDateString()

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <div className="aspect-square w-full overflow-hidden">
                <Image
                    src={organization.imageUrl || "/placeholder.svg?height=200&width=200&query=organization"}
                    alt={organization.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                />
            </div>
            <CardContent className="p-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{organization.name}</h3>
                        <p className="text-xs text-muted-foreground">Created on {formattedDate}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}