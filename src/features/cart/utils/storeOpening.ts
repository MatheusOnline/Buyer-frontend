import type { StoreBusinessDay } from "../types";

const timezone = "America/Sao_Paulo";
function parts(date: Date) {
    const values = new Intl.DateTimeFormat("en-US", { timeZone: timezone, weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
    return Object.fromEntries(values.map(({ type, value }) => [type, value]));
}
const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function nextStoreOpening(schedule?: StoreBusinessDay[], now = new Date()): string | null {
    if (!schedule?.length) return null;
    const current = parts(now);
    const today = weekdays[current.weekday];
    const time = `${current.hour}:${current.minute}`;
    for (let offset = 0; offset <= 7; offset += 1) {
        const day = schedule.find(item => item.day === (today + offset) % 7);
        if (!day?.enabled) continue;
        if (offset === 0 && (time >= day.end || time >= day.start)) continue;
        const localDate = new Date(`${current.year}-${current.month}-${current.day}T12:00:00-03:00`);
        localDate.setDate(localDate.getDate() + offset);
        return new Intl.DateTimeFormat("pt-BR", { timeZone: timezone, weekday: "long", day: "numeric", month: "long" }).format(localDate);
    }
    return null;
}
