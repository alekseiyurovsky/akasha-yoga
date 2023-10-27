//2023-10-26T07:15:29.130Z
export const getFormattedStorageDateString = (date: Date, time: string) =>
  `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${time}:00.000Z`;
