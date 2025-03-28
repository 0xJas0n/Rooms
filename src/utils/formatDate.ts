export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${isoString}`);
    }

    return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};