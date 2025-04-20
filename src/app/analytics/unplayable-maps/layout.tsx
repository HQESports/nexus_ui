// app/layout.tsx
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { NavigationLoadingProvider } from '@/components/NavigationLoadingProvider';

export default function FullscreenLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <NavigationLoadingProvider>
            <LoadingOverlay />
            {children}
        </NavigationLoadingProvider>
    );
}