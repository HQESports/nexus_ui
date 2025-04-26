'use server'

import { format } from "date-fns"
import { revalidatePath } from "next/cache"
import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import { put, list } from '@vercel/blob'

export async function getUnplayableMapImage(
    mapName: string,
    startDate: Date,
    endDate: Date,
    threshold: number,
    overlayColor: string,
    overlayOpacity: number,
    width = 800,
    height = 800,
): Promise<string> {
    try {
        // Format dates for the API
        const formattedStartDate = format(startDate, "yyyy-MM-dd")
        const formattedEndDate = format(endDate, "yyyy-MM-dd")

        // Generate a unique hash for the image
        const paramsString = JSON.stringify({
            mapName, formattedStartDate, formattedEndDate, threshold,
            overlayColor, overlayOpacity, width, height
        })
        const hash = crypto.createHash('md5').update(paramsString).digest('hex')
        const filename = `map-${hash}.png`
        const relativePath = `/map-images/${filename}`

        // Check if the blob already exists in Vercel (if in production)
        if (process.env.VERCEL === '1') {
            try {
                // List blobs with the specific filename
                const { blobs } = await list({ prefix: filename, limit: 1 });

                // If the blob exists, return its URL directly
                if (blobs.length > 0) {
                    return blobs[0].url;
                }
            } catch (listError) {
                // If listing fails, we'll just proceed to generate a new image
                console.log("Unable to check for existing blob, will create new one:", listError);
            }
        } else {
            // In development, check local filesystem
            const publicDir = path.join(process.cwd(), 'public');
            const mapImagesDir = path.join(publicDir, 'map-images');
            const filePath = path.join(mapImagesDir, filename);

            try {
                // Check if file exists locally
                await fs.access(filePath);
                // If it exists, return the relative path
                return relativePath;
            } catch (accessError) {
                // File doesn't exist, will create it below
            }
        }

        // If we reach here, we need to generate the image
        const baseURL = process.env.API_UNPLAYABLE_URL;

        // Construct the API URL
        const apiUrl = new URL(`${baseURL}/api/unplayable-map`)

        // Add query parameters
        apiUrl.searchParams.append("map_name", mapName)
        apiUrl.searchParams.append("start_date", formattedStartDate)
        apiUrl.searchParams.append("end_date", formattedEndDate)
        apiUrl.searchParams.append("threshold", threshold.toString())
        apiUrl.searchParams.append("overlay_color", overlayColor)
        apiUrl.searchParams.append("overlay_opacity", Math.round(overlayOpacity).toString())
        apiUrl.searchParams.append("width", width.toString())
        apiUrl.searchParams.append("height", height.toString())

        // Fetch the image with increased timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000) // 60-second timeout

        const response = await fetch(apiUrl.toString(), {
            signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        // Get the image data as a buffer
        const imageBuffer = await response.arrayBuffer()

        // Choose storage method based on environment
        if (process.env.VERCEL === '1') {
            // In Vercel production, use Vercel Blob Storage with allowOverwrite
            const { url } = await put(filename, new Blob([imageBuffer]), {
                access: 'public',
                allowOverwrite: true, // Add this to allow overwriting
            });

            return url;
        } else {
            // In development, save to local filesystem
            const publicDir = path.join(process.cwd(), 'public');
            const mapImagesDir = path.join(publicDir, 'map-images');

            // Create directory if it doesn't exist
            try {
                await fs.mkdir(mapImagesDir, { recursive: true });
            } catch (err) {
                console.error("Error creating directory:", err);
            }

            const filePath = path.join(mapImagesDir, filename);
            await fs.writeFile(filePath, Buffer.from(imageBuffer));

            return relativePath;
        }
    } catch (error) {
        console.error("Error fetching unplayable map image:", error)
        throw error
    }
}