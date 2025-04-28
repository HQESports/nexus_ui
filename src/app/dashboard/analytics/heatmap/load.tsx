import { Skeleton } from "@/components/ui/skeleton"

export default function MapViewerLoading() {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-black">
            {/* Main Content - Map Area */}
            <div className="flex-1 flex items-center justify-center p-0 m-0 overflow-hidden">
                <div className="relative">
                    <Skeleton className="w-[700px] h-[700px] bg-gray-800/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <span>Loading map...</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-64 border-l bg-background flex flex-col h-full">
                <div className="p-4 border-b">
                    <Skeleton className="h-6 w-[120px] mb-2" />
                    <Skeleton className="h-4 w-[180px]" />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-6">
                        {/* Map Selection */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[60px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Date Range */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Match Types */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Phase Selector */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        {/* Style */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[60px]" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
