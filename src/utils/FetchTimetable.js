export async function fetchTimetable(time_start, time_end, group_id) {
    /**
     * Генерит запрос на получение расписания и возвращает промис с спаршенным ответом в словаре
     */
    var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/event/`),
        params = {
            start: time_start.toISOString().slice(0, 10),
            end: time_end.toISOString().slice(0, 10),
            limit: 0,
            offset: 0,
            group_id: group_id
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url).then(response => response.json());
}
