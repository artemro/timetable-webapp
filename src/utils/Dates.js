export function getMonday(d) {
    /**
     * Возвращает понедельник текущей недели
     */
    let dt = getMidnight(d);
    var day = dt.getDay(),
        diff = dt.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(dt.setDate(diff));
}


export function getMidnight(d) {
    /**
     * Возвращает начало сегодняшнего дня
     */
    let dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
}

export function isToday(d, today) {
    /**
     * Проверяет совпадение дат, но не времени
     */
    let d1 = new Date(d),
        d2 = new Date(today);
    let isToday = (
        d1.getFullYear() == d2.getFullYear()
        && d1.getUTCMonth() == d2.getUTCMonth()
        && d1.getUTCDate() == d2.getUTCDate()
    );
    return isToday;
}
