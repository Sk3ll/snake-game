export const swap = (obj: Record<string, string>) => Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
