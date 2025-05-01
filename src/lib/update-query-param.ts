'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateQueryParam = () => {
    const router = useRouter();

    return useCallback((param: string, value: string | number | boolean | null, prevParams: ReadonlyURLSearchParams) => {
        const params = new URLSearchParams(prevParams.toString());
        if (value === null || value === undefined || value === '') {
            params.delete(param);
        } else {
            params.set(param, String(value));
        }

        const newUrl = params.toString() ? `?${params.toString()}` : '';
        router.push(newUrl);
    }, [router]);
};