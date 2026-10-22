export function getLoginDestination(value:unknown):string {
    if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || /[\\\s]/.test(value)) return "/";
    try {
        const url = new URL(value, "https://compras.local");
        if (url.origin !== "https://compras.local" || /^\/auth(?:\/|$)/i.test(url.pathname)) return "/";
        return url.pathname + url.search + url.hash;
    } catch {return "/";}
}
