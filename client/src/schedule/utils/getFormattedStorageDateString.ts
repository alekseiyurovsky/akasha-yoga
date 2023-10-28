//2023-10-26T07:15:29.130Z
export const getFormattedStorageDateString = (date: Date, time: string) => {
    const [datePart, ...other] = date.toISOString().split('T');
    return `${datePart}T${time}:00.000Z`;
}

