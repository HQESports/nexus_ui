// app/layout.tsx
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { NavigationLoadingProvider } from '@/components/NavigationLoadingProvider';
import { Suspense } from 'react';

export default function FullscreenLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Suspense>
            <NavigationLoadingProvider>
                <LoadingOverlay />
                {children}
            </NavigationLoadingProvider>
        </Suspense>
    );
}