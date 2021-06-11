export const formatDate = (date) => {
    if (date.length > 2 && date !== undefined) {
        const newDate = new Date(date)
        return `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()}-${newDate.getDay()}`
    } else {
        return ""
    }
};