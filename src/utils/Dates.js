export function getMonday(d) {
    /**
     * Возвращает понедельник текущей недели
     */
    let dt = new Date(d);
    var day = dt.getDay(),
        diff = dt.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(dt.setDate(diff));
}

export function getIsoDate(date) {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '-' + month + '-' + dt;
}

export function isToday(d, today) {
    /**
     * Проверяет совпадение дат, но не времени
     */
    let d1 = getIsoDate(d),
        d2 = getIsoDate(today);
    return d1 === d2;
}
