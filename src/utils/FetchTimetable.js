import { getIsoDate } from "@/utils/Dates.js";

export async function fetchTimetable(time_start, time_end, group_id) {
    /**
     * Генерит запрос на получение расписания и возвращает промис с спаршенным ответом в словаре
     */
    let time_start_str = getIsoDate(time_start);
    let time_end_str = getIsoDate(time_end);
    console.log(`Loading data from ${time_start_str} to ${time_end_str}`);

    var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/event/`),
        params = {
            start: time_start_str,
            end: time_end_str,
            limit: 0,
            offset: 0,
            group_id: group_id
        };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url).then(response => response.json());
}
