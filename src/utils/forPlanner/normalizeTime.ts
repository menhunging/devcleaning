export const normalizeTime = (time: string) =>
  time.length === 8 ? time.slice(0, 5) : time; // "00:05:00" → "00:05"
