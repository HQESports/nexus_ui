import { TeamRequest, TeamResponse } from "@/app/actions/teams"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Team } from "./models"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates a percentage from a number and a total
 * @param value The value to calculate percentage for
 * @param total The total value that represents 100%
 * @param decimals The number of decimal places to round to (default: 2)
 * @returns The calculated percentage
 */
export function calculatePercentage(value: number | undefined, total: number | undefined, decimals: number = 2): number {
  if (!value) {
    return 0
  }

  if (!total) {
    return 0
  }

  if (total === 0) {
    return 0; // Avoid division by zero
  }

  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(decimals));
}

/**
 * Formats a list of strings with proper comma and "and" formatting
 * @param strings Any number of strings to format
 * @returns A properly formatted string (e.g., "one, two, and three")
 */
export function formatList(...strings: string[]): string {
  // Filter out empty strings
  const filteredStrings = strings.filter(str => str.trim() !== '');

  // Handle special cases
  if (filteredStrings.length === 0) {
    return '';
  }

  if (filteredStrings.length === 1) {
    return filteredStrings[0];
  }

  if (filteredStrings.length === 2) {
    return `${filteredStrings[0]} and ${filteredStrings[1]}`;
  }

  // For 3 or more items, format with commas and "and"
  const lastItem = filteredStrings.pop();
  return `${filteredStrings.join(', ')}, and ${lastItem}`;
}

/**
 * Calculates estimated time remaining based on creation time, current time, and progress percentage
 * 
 * @param createdAt - The datetime when the task/process was created
 * @param updatedAt - The datetime when the progress was last updated
 * @param percentComplete - The current completion percentage (0-100)
 * @returns A string with the estimated time remaining or appropriate message
 */
export function calculateTimeRemaining(
  createdAt: Date,
  updatedAt: Date,
  percentComplete: number
): string {
  // Validate inputs
  if (percentComplete < 0 || percentComplete > 100) {
    return "Percentage must be between 0 and 100";
  }

  if (percentComplete === 100) {
    return "Complete";
  }

  if (percentComplete === 0) {
    return "Calculating...";
  }

  // Calculate elapsed time in milliseconds
  const elapsedMs = updatedAt.getTime() - createdAt.getTime();

  // Calculate rate of progress (ms per percent)
  const msPerPercent = elapsedMs / percentComplete;

  // Calculate remaining time in milliseconds
  const remainingPercent = 100 - percentComplete;
  const estimatedRemainingMs = msPerPercent * remainingPercent;

  // Convert to human-readable format
  let timeLeft = ""
  if (estimatedRemainingMs < 0) {
    timeLeft = "Unable to estimate";
  } else if (estimatedRemainingMs < 60000) { // Less than a minute
    timeLeft = "Less than a minute";
  } else if (estimatedRemainingMs < 3600000) { // Less than an hour
    const minutes = Math.round(estimatedRemainingMs / 60000);
    timeLeft = `About ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (estimatedRemainingMs < 86400000) { // Less than a day
    const hours = Math.round(estimatedRemainingMs / 3600000);
    timeLeft = `About ${hours} hour${hours !== 1 ? 's' : ''}`;
  } else { // Days or more
    const days = Math.round(estimatedRemainingMs / 86400000);
    timeLeft = `About ${days} day${days !== 1 ? 's' : ''}`;
  }

  return "Time Remaining: " + timeLeft
}

export /**
* Calculates the elapsed time between two dates and returns it in shorthand format
* @param startDate The starting date
* @param endDate The ending date
* @returns A string representing the elapsed time in shorthand format (e.g., "5 min", "2 hr")
*/
  function getElapsedTime(startDate: Date, endDate: Date): string {
  // Calculate the difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime();

  // Convert to different time units
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Return the appropriate format based on the timespan
  if (diffYears > 0) {
    return `${diffYears} yr`;
  } else if (diffMonths > 0) {
    return `${diffMonths} mo`;
  } else if (diffDays > 0) {
    return `${diffDays} d`;
  } else if (diffHours > 0) {
    return `${diffHours} hr`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} min`;
  } else {
    return `${diffSeconds} sec`;
  }
}

export const mapNameMap = {
  "Baltic_Main": "Erangel",
  "Chimera_Main": "Paramo",
  "Desert_Main": "Miramar",
  "DihorOtok_Main": "Vikendi",
  "Erangel_Main": "Erangel",
  "Heaven_Main": "Haven",
  "Kiki_Main": "Deston",
  "Range_Main": "Camp Jackal",
  "Savage_Main": "Sanhok",
  "Summerland_Main": "Karakin",
  "Tiger_Main": "Taego",
  "Neon_Main": "Rondo"
}

/**
 * Calculates the rate per second based on a start time, end time, and total number.
 * 
 * @param startTime - The start time as a Date object
 * @param endTime - The end time as a Date object
 * @param total - The total number of items/events processed
 * @returns The rate per second as a number, or Infinity if the duration is 0
 */
export function calculateRatePerSecond(startTime: Date, endTime: Date, total: number): number {
  // Calculate the duration in milliseconds
  const durationMs = endTime.getTime() - startTime.getTime();

  // Convert duration to seconds
  const durationSeconds = durationMs / 1000;

  // Handle edge case where duration is 0
  if (durationSeconds === 0) {
    return Infinity; // Avoid division by zero
  }

  // Calculate and return the rate per second
  return Math.round(total / durationSeconds);
}


/**
 * Validates a parameter against a list of valid values
 * @param param The parameter to validate
 * @param validValues Array of valid values
 * @param defaultValue Default value to use if param is invalid or undefined
 * @returns The validated parameter or default value
 */
export function validateParam(param: string | undefined, validValues: string[], defaultValue: string): string {
  if (!param) return defaultValue

  const normalizedParam = param.toLowerCase()
  return validValues.includes(normalizedParam) ? normalizedParam : defaultValue
}


/**
 * Converts the Team model to the format expected by the API
 * Use this when preparing data for the form
 */
export function teamToFormData(team: TeamRequest, imageFile?: File | null): FormData {
  const formData = new FormData();

  // Add team JSON as a form value
  formData.append('team', JSON.stringify(team));

  // Add image if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  return formData;
}

/**
* Converts MongoDB _id to the id format expected by the API
*/
export function convertTeamForApi(team: Team): TeamRequest {
  const { id, imageUrl, ...rest } = team;
  return rest;
}

/**
* Converts API response to the team model format used in the application
*/
export function apiResponseToTeam(response: TeamResponse): Team {
  return {
    id: response.id,
    name: response.name,
    imageUrl: response.imageUrl,
    esportTag: response.esportTag,
    searchCount: response.searchCount as 2 | 3 | 4,
    players: response.players,
  };
}

/**
 * Calculates the distance between two points in a 2D space
 * @param x1 The x-coordinate of the first point
 * @param y1 The y-coordinate of the first point
 * @param x2 The x-coordinate of the second point
 * @param y2 The y-coordinate of the second point
 * @returns The distance between the two points
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}