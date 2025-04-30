// components/LoadingOverlay.tsx
'use client';

import { useNavigationLoading } from './NavigationLoadingProvider';

export function LoadingOverlay() {
    const { isNavigating } = useNavigationLoading();

    if (!isNavigating) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-3 bg-background px-4 py-2 rounded-lg shadow-lg border">
            <div className="w-6 h-6 rounded-full border-3 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div>
                <p className="text-sm font-medium">Loading Goonology...</p>
            </div>
        </div>
    );
}