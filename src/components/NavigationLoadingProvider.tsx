// components/NavigationLoadingProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Define context type
interface NavigationLoadingContextType {
    isNavigating: boolean;
    setIsNavigating: (isNavigating: boolean) => void;
}

// Create context with default values
const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
    isNavigating: false,
    setIsNavigating: () => { },
});

interface NavigationLoadingProviderProps {
    children: ReactNode;
}

export function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
    const [isNavigating, setIsNavigating] = useState<boolean>(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleStart = () => setIsNavigating(true);
        const handleComplete = () => setIsNavigating(false);

        window.addEventListener('beforeunload', handleStart);
        window.addEventListener('navigationstart', handleStart);
        window.addEventListener('navigationcomplete', handleComplete);
        window.addEventListener('routechangeerror', handleComplete);

        return () => {
            window.removeEventListener('beforeunload', handleStart);
            window.removeEventListener('navigationstart', handleStart);
            window.removeEventListener('navigationcomplete', handleComplete);
            window.removeEventListener('routechangeerror', handleComplete);
        };
    }, []);

    // Reset loading state when route or search params change
    useEffect(() => {
        setIsNavigating(false);
    }, [pathname, searchParams]);

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, setIsNavigating }}>
            {children}
        </NavigationLoadingContext.Provider>
    );
}

// Hook to access the context
export function useNavigationLoading(): NavigationLoadingContextType {
    return useContext(NavigationLoadingContext);
}