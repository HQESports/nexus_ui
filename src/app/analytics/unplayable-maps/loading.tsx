import { Skeleton } from "@/components/ui/skeleton"

export default function UnplayableMapLoading() {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-black">
            {/* Main Content - Map Area */}
            <div className="flex-1 flex items-center justify-center p-0 m-0 overflow-hidden">
                <div className="relative">
                    <Skeleton className="w-[800px] h-[800px] bg-gray-800/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            <span>Loading map...</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l bg-background flex flex-col h-full">
                <div className="p-4 border-b">
                    <Skeleton className="h-6 w-[180px] mb-2" />
                    <Skeleton className="h-4 w-[220px]" />
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

                        {/* Threshold */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-4 w-[40px]" />
                            </div>
                            <Skeleton className="h-5 w-full" />
                        </div>

                        {/* Overlay Color */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-12 h-10" />
                                    <Skeleton className="flex-1 h-10" />
                                </div>
                                <Skeleton className="h-8 w-full" />
                            </div>
                        </div>

                        {/* Overlay Opacity */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-[120px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                            <Skeleton className="h-5 w-full" />
                        </div>

                        {/* API URL Preview */}
                        <Skeleton className="h-[120px] w-full mt-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}
