// components/ClientImageWrapper.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useNavigationLoading } from '@/components/NavigationLoadingProvider';

interface ClientImageWrapperProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export function ClientImageWrapper({
    src,
    alt,
    width,
    height,
    className
}: ClientImageWrapperProps) {
    const { setIsNavigating } = useNavigationLoading();

    // Set loading to false when the component mounts (image has loaded)
    useEffect(() => {
        setIsNavigating(false);
    }, [src, setIsNavigating]);

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onLoad={() => setIsNavigating(false)} // Additional safeguard for image loading
        />
    );
}