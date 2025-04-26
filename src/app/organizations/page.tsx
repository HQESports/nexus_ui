"no cache"

import { GetOrganizations } from "../actions/organization"
import OrganizationList from "./organization-list"

export default async function OrganizationsPage() {
    // This would typically come from an API or database

    const { success, data: orgs, error } = await GetOrganizations();

    if (!success) {
        return <div>Failed to get metrics</div>
    }

    if (error) {
        return <div>Error getting metrics</div>
    }

    if (!orgs) {
        return <div>Metrics is Empty</div>
    }w

    return (
        <div className="container mx-auto p-8">
            <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
            <OrganizationList organizations={orgs} />
        </div>
    )
}
