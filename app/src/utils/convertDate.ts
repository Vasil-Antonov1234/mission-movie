export function convertDate(date: string) {
    const baseDate = new Date(date);
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).length > 1 ? baseDate.getMonth() + 1 : `0${baseDate.getMonth() + 1}`;
    const day = String(baseDate.getDate()).length > 1 ? baseDate.getDate() : `0${baseDate.getDate()}`;
    const hours = baseDate.getHours();
    const minutes = baseDate.getMinutes();

    return `${day}-${month}-${year} (${hours}:${minutes})`;
}