export function getFormateDate(dateString: string): string {
  if (!dateString || dateString === "0000-00-00 00:00:00") {
    return "-";
  }

  const date = new Date(dateString.replace(" ", "T"));
  // заменяем пробел на T, чтобы корректно парсилось

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // последние 2 цифры
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} | ${hours}:${minutes}`;
}
