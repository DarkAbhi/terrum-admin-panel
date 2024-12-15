/**
 * Formats a date string for user joining in a user-friendly format.
 *
 * @param {string} dateString - A date string in a format that can be parsed by JavaScript's Date constructor.
 * @returns {string} - A formatted date string in the "Month Day, Year, Hour:Minute" format.
 */
export function formatDateForUserJoining(dateString: string): string {
    // Create a new Date object from the input dateString.
    const date = new Date(dateString);

    // Define formatting options for the date.
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric", // Display the year in numeric format (e.g., 2023).
        month: "short", // Display the month in abbreviated form (e.g., Jan).
        day: "numeric", // Display the day of the month in numeric form (e.g., 26).
        hour: "numeric", // Display the hour in numeric format (e.g., 15 for 3 PM).
        minute: "numeric", // Display the minute in numeric format (e.g., 09).
    };

    // Create a DateTimeFormat object for formatting the date.
    const formatter = new Intl.DateTimeFormat("en-US", options);

    // Format the date using the specified options and return the formatted string.
    return formatter.format(date);
}