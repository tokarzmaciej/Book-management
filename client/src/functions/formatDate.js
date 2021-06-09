export const formatDate = (date) => {
    if (date.length > 2) {
        const newDate = new Date(date)
        return `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()}-${newDate.getDay()}`
    } else {
        return ""
    }
};