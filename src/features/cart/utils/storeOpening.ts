import type { StoreBusinessDay } from "../types";

const timezone = "America/Sao_Paulo";
const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function localParts(date: Date) {
    const values = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);
    return Object.fromEntries(values.map(({ type, value }) => [type, value]));
}

function nextEnabledDay(schedule: StoreBusinessDay[], today: number) {
    for (let offset = 1; offset <= 7; offset += 1) {
        const day = schedule.find(item => item.day === (today + offset) % 7 && item.enabled);
        if (day) return offset;
    }
    return null;
}

/** Gives the earliest store-processing day, using the shop's closing time as its order cutoff. */
export function storeArrivalLabel(schedule?: StoreBusinessDay[], storeIsOpen = true, now = new Date()): string {
    if (storeIsOpen) return "CHEGARÁ HOJE";
    if (!schedule?.length) return "CHEGARÁ AMANHÃ";

    const current = localParts(now);
    const today = weekdays[current.weekday];
    const currentTime = `${current.hour}:${current.minute}`;
    const todayHours = schedule.find(item => item.day === today && item.enabled);

    // Before today's closing time, orders are still eligible to be received today,
    // including orders placed before opening time.
    if (todayHours && currentTime < todayHours.end) return "CHEGARÁ HOJE";

    const offset = nextEnabledDay(schedule, today);
    if (offset === null) return "CHEGARÁ NO PRÓXIMO DIA DE FUNCIONAMENTO";
    if (offset === 1) return "CHEGARÁ AMANHÃ";

    const [year, month, day] = [Number(current.year), Number(current.month), Number(current.day)];
    const target = new Date(Date.UTC(year, month - 1, day + offset, 12));
    const dateLabel = new Intl.DateTimeFormat("pt-BR", {
        timeZone: timezone,
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(target);
    return `CHEGARÁ ${dateLabel.toLocaleUpperCase("pt-BR")}`;
}
