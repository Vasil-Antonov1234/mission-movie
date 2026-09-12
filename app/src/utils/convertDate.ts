export function convertDate(date: string | undefined): string {
    
    if (!date) {
        return "";
    };
    
    const baseDate = new Date(date);
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).length > 1 ? baseDate.getMonth() + 1 : `0${baseDate.getMonth() + 1}`;
    const day = String(baseDate.getDate()).length > 1 ? baseDate.getDate() : `0${baseDate.getDate()}`;
    const hours = String(baseDate.getHours()).length > 1 ? baseDate.getHours() : `0${baseDate.getHours()}`;
    const minutes = String(baseDate.getMinutes()).length > 1 ? baseDate.getMinutes() : `0${baseDate.getMinutes()}`;

    return `${day}-${month}-${year} (${hours}:${minutes})`;
}