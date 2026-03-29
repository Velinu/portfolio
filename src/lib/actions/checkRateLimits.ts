import dayjs from "dayjs";

const RATE_LIMIT = 5;
const WINDOW_MINUTES = 5;

const attempts = new Map<string, { count: number; resetAt: dayjs.Dayjs }>();

export function checkRateLimit(ip: string): void {
    const now = dayjs();
    const entry = attempts.get(ip);

    if (!entry || now.isAfter(entry.resetAt)) {
        attempts.set(ip, { count: 1, resetAt: now.add(WINDOW_MINUTES, 'minute') });
        return;
    }

    if (entry.count >= RATE_LIMIT) {
        throw new Error(`Too many requests. Try again in ${entry.resetAt.diff(now, 'minute') + 1} minute(s).`);
    }

    entry.count++;
}