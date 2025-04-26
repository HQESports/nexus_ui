// app/actions/getMapImage.ts
'use server'

import { format } from "date-fns"
import { revalidatePath } from "next/cache"
import crypto from 'crypto'

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

        const baseURL = process.env.API_UNPLAYABLE_URL;
        console.log(baseURL)
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

        // Generate a unique hash for the image
        const paramsString = JSON.stringify({
            mapName, formattedStartDate, formattedEndDate, threshold,
            overlayColor, overlayOpacity, width, height
        })
        const hash = crypto.createHash('md5').update(paramsString).digest('hex')
        const filename = `map-${hash}.png`
        const relativePath = `/map-images/${filename}`

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

        // Return the relative path to use with Next.js Image
        return relativePath
    } catch (error) {
        console.error("Error fetching unplayable map image:", error)
        throw error
    }
}