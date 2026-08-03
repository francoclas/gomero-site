function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function todayISODate(): string {
  const now = new Date();
  return startOfDay(now).toISOString().slice(0, 10);
}

export function isOverdue(dueDate: string | undefined, status: string): boolean {
  if (!dueDate || status === "done") return false;
  return startOfDay(new Date(dueDate)) < startOfDay(new Date());
}

export function isDueTodayOrOverdue(dueDate: string | undefined, status: string): boolean {
  if (!dueDate || status === "done") return false;
  return startOfDay(new Date(dueDate)) <= startOfDay(new Date());
}

export function formatDueDate(dueDate: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short" }).format(new Date(dueDate));
}
