export const formatDateToBackend = (date) => {
    if (date.length > 2 && date !== undefined) {
        const newDate = new Date(date);
        const convertDate = `${newDate.getUTCFullYear()}-${((newDate.getUTCMonth())).toString().length > 1 ? (newDate.getUTCMonth()) :
            "0" + (newDate.getUTCMonth())}-${newDate.getUTCDate().toString().length > 1 ? newDate.getUTCDate() : "0" + newDate.getUTCDate()}`;
        const year = convertDate.slice(0, 4);
        const month = convertDate.slice(5, 7);
        const day = convertDate.slice(8, 10);

        const convert = new Date(year, month, day, 24, 0, 0);
        return convert.toISOString();

    } else {
        return ""
    }
};

export const formatDateOnFrontend1 = (date) => {
    if (date.length > 2 && date !== undefined) {
        const covertDate = new Date(Date.parse(date) + 86400000).toISOString().slice(0, 10);
        return covertDate
    } else {
        return ""
    }
};

export const formatDateOnFrontend2 = (date) => {
    if (date.length > 2 && date !== undefined) {
        const covertDate = new Date(Date.parse(date) - 86400000).toISOString().slice(0, 10);
        return covertDate
    } else {
        return ""
    }
};