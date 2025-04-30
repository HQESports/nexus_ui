export const THERMAL_GRADIENTS: Record<string, Record<number, string>> = {
    DEFAULT: {
        1: "0,0,255",    // Deep blue (coldest)
        2: "0,114,255",  // Medium blue
        3: "0,255,255",  // Cyan
        4: "0,255,0",    // Green
        5: "255,255,0",  // Yellow
        6: "255,165,0",  // Orange
        7: "255,69,0",   // Red-orange
        8: "255,0,0",    // Bright red (hottest)
        0: "204,204,204" // Default: Light gray
    },
    THERMAL_CLASSIC: {
        1: "0,0,255",    // Deep blue (coldest)
        2: "0,114,255",  // Medium blue
        3: "0,255,255",  // Cyan
        4: "0,255,0",    // Green
        5: "255,255,0",  // Yellow
        6: "255,165,0",  // Orange
        7: "255,69,0",   // Red-orange
        8: "255,0,0",    // Bright red (hottest)
        0: "204,204,204" // Default: Light gray
    },
    THERMAL_INVERTED: {
        1: "255,0,0",    // Bright red (hottest)
        2: "255,69,0",   // Red-orange
        3: "255,165,0",  // Orange
        4: "255,255,0",  // Yellow
        5: "0,255,0",    // Green
        6: "0,255,255",  // Cyan
        7: "0,114,255",  // Medium blue
        8: "0,0,255",    // Deep blue (coldest)
        0: "204,204,204" // Default: Light gray
    },
    THERMAL_MAGMA: {
        1: "0,0,4",       // Near black
        2: "40,0,41",     // Dark purple
        3: "101,0,89",    // Purple
        4: "173,11,79",   // Magenta
        5: "225,45,40",   // Red
        6: "249,105,25",  // Orange
        7: "254,180,64",  // Light orange
        8: "252,255,164", // Pale yellow
        0: "204,204,204"  // Default: Light gray
    },
    THERMAL_VIRIDIS: {
        1: "68,1,84",     // Dark purple
        2: "72,40,120",   // Purple
        3: "62,73,137",   // Blue
        4: "49,104,142",  // Blue-green
        5: "38,130,142",  // Teal
        6: "32,165,134",  // Green
        7: "122,209,81",  // Light green
        8: "253,231,37",  // Yellow
        0: "204,204,204"  // Default: Light gray
    },
    THERMAL_INFERNO: {
        1: "0,0,4",       // Near black
        2: "51,13,53",    // Dark purple
        3: "114,31,73",   // Purple
        4: "181,51,54",   // Red-purple
        5: "229,85,29",   // Red
        6: "251,135,20",  // Orange
        7: "253,194,8",   // Yellow-orange
        8: "252,252,139", // Light yellow
        0: "204,204,204"  // Default: Light gray
    },
    THERMAL_PLASMA: {
        1: "13,8,135",    // Dark blue
        2: "84,2,163",    // Purple
        3: "139,10,165",  // Magenta
        4: "185,31,148",  // Pink
        5: "220,55,107",  // Red-pink
        6: "244,91,67",   // Red-orange
        7: "253,142,37",  // Orange
        8: "240,249,33",  // Yellow
        0: "204,204,204"  // Default: Light gray
    },
    THERMAL_GRAYSCALE: {
        1: "0,0,0",       // Black
        2: "37,37,37",    // Very dark gray
        3: "73,73,73",    // Dark gray
        4: "110,110,110", // Medium-dark gray
        5: "146,146,146", // Medium gray
        6: "183,183,183", // Medium-light gray
        7: "219,219,219", // Light gray
        8: "255,255,255", // White
        0: "128,128,128"  // Default: Medium gray
    },
    THERMAL_COPPER: {
        1: "0,0,0",       // Black
        2: "51,24,11",    // Very dark copper
        3: "102,48,22",   // Dark copper
        4: "153,72,33",   // Medium-dark copper
        5: "204,96,44",   // Medium copper
        6: "225,138,76",  // Light copper
        7: "241,163,104", // Very light copper
        8: "255,204,153", // Pale copper
        0: "204,204,204"  // Default: Light gray
    }
};
