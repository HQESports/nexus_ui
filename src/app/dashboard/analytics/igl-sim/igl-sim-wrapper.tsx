import { FilteredMatchesParams, FilteredMatchResponse } from "@/app/actions/matches";
import MatchFilter from "@/components/filters/match-filter";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";

interface IGLSimWrapperParams {
    matchesResponse: FilteredMatchResponse
    filterParams: FilteredMatchesParams
    map: string
}

export default function IGLSimWrapper({ filterParams, matchesResponse, map }: IGLSimWrapperParams) {
    return (
        <SidebarProvider>
            <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden">
                <div className="flex-1 flex items-center justify-center">
                    <div className="min-w-[600px] flex items-center justify-center">

                    </div>
                </div>
                <Sidebar side="right" className="border-l">
                    <SidebarHeader className="border-b">
                        <div className="flex flex-col items-center justify-between">
                            <h1 className="text-2xl font-bold">Heatmap Controls</h1>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <MatchFilter filterParams={filterParams} count={undefined} />
                    </SidebarContent>
                </Sidebar>
            </div>
        </SidebarProvider >
    )
}