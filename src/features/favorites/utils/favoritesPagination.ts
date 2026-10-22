export function favoritesPage(value:string | null) {
    const page = Number(value);
    return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
export function favoritesPageUrl(page:number) {
    return page > 1 ? `/favorites?page=${page}` : "/favorites";
}
