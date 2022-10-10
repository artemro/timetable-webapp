export function getMonday(d) {
    /**
     * Возвращает понедельник текущей недели
     */
    d = getMidnight(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


export function getMidnight(d) {
    /**
     * Возвращает начало сегодняшнего дня
     */
    d = new Date(d);
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);
    return d;
}

export function isToday(d, today) {
    /**
     * Проверяет совпадение дат, но не времени
     */
    d = new Date(d);
    today = new Date(today);
    let isToday = (
        today.getFullYear() == d.getFullYear()
        && today.getUTCMonth() == d.getUTCMonth()
        && today.getUTCDate() == d.getUTCDate()
    );
    return isToday;
}
