export function countPages(moviesCount: string) {
    const moviesCoundNum = Math.ceil(Number(moviesCount) / 20);
    const result = [];
    let page = 1;

    for (let i = 0; i < moviesCoundNum; i++) {
        result.push(page);
        page++;
    }

    return result;
};