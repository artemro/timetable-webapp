<template>
    <div class="container">
        <div class="weekday">
            <span
                class="noselect clickable"
                @click="changeDate({ detail: { dir: 'right' } })"
            >
                <span class="material-symbols-sharp"> arrow_back_ios </span>
                {{ yesterdayWeekdayFormated }}
            </span>
            <span class="noselect">{{ todayWeekdayFormated }}</span>
            <span
                class="noselect clickable"
                @click="changeDate({ detail: { dir: 'left' } })"
            >
                {{ tomorrowWeekdayFormated }}
                <span class="material-symbols-sharp"> arrow_forward_ios </span>
            </span>
        </div>
        <div
            v-if="!loaded"
            class="lds-dual-ring"
        ></div>
        <template v-else>
            <div
                v-if="!timetable.length"
                class="no-events"
            >
                Свободный день!
            </div>
            <div v-else>
                <EventRow
                    v-for="lesson of timetable"
                    :key="lesson.id"
                    :lesson="lesson"
                    @click="$router.push(`/timetable/event/${lesson.id}`)"
                />
            </div>
        </template>
    </div>
</template>

<script>
import EventRow from '@/components/EventRow.vue';
import retry from '@/utils/Retrying.js';
import { fetchTimetable } from '@/utils/FetchTimetable.js';
import { getMonday, isToday, getIsoDate } from '@/utils/Dates.js';

export default {
    components: {
        EventRow,
    },
    data: () => ({
        loaded: true,
        date: new Date(),
        groupId: undefined,
        groupInfo: { number: '' },
        timetable: [],
    }),
    computed: {
        todayWeekdayFormated() {
            const wdname = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ];
            return wdname[this.date.getDay()];
        },
        yesterdayWeekdayFormated() {
            const wdname = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            return wdname[(this.date.getDay() + 6) % 7]; // День недели через 6 дней == День недели вчера, но точно положительный =)
        },
        tomorrowWeekdayFormated() {
            const wdname = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
            return wdname[(this.date.getDay() + 1) % 7];
        },
        headerEvent() {
            return new CustomEvent('change-header-layout', {
                detail: {
                    layoutName: 'calendar',
                    text: 'Твой физфак!',
                    groupInfo: this.groupInfo,
                    disabled: false,
                    menu: [
                        {
                            name: 'Изменить группу',
                            action: this.reinitTimetable,
                        },
                    ],
                },
            });
        },
    },
    watch: {
        date(newDate, oldDate) {
            this.loaded = false;
            // 5 раз с интервалом в 1 секунду попробуй скачать расписание
            this.loadTimetableOnDate(newDate);

            fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
                method: 'POST',
                cache: 'no-cache',
                redirect: 'follow',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: localStorage.getItem('marketing-id'),
                    action: 'timetable change date',
                    path_from: '/timetable',
                    path_to: '/timetable',
                    additional_data: JSON.stringify({
                        date: getIsoDate(newDate),
                        prev_date: getIsoDate(oldDate),
                        group: this.groupInfo || { id: this.groupId } || null,
                    }),
                }),
            });
        },
    },
    beforeMount() {
        document.addEventListener('change-date', e => {
            this.date = e.detail.date;
        });
        document.addEventListener(
            'sync-date-response',
            this.syncDateResponseHandler,
        );
        document.addEventListener('swipe', this.changeDate);
    },
    beforeUnmount() {
        document.removeEventListener(
            'sync-date-response',
            this.syncDateResponseHandler,
        );
        document.removeEventListener('swipe', this.changeDate);
    },
    mounted() {
        document.dispatchEvent(this.headerEvent);
        this.groupId = localStorage.getItem('timetable-group-id');
        this.loadGroupInfo();

        document.dispatchEvent(new CustomEvent('sync-date'));

        // Обработка стрелочек
        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight')
                this.changeDate({
                    detail: { dir: 'left' },
                });
            // Ой не спрашивайте, почему право это лево....
            else if (e.key === 'ArrowLeft')
                this.changeDate({ detail: { dir: 'right' } });
        });

        // Загружаем кэш в память
        this.loadTimetableCache();
    },
    methods: {
        loadGroupInfo() {
            // Loading from cache if exists
            try {
                this.groupInfo = JSON.parse(
                    localStorage.getItem('timetable-group-info'),
                );
                document.dispatchEvent(this.headerEvent);
            } catch (err) {
                console.log('Can not take group info from cache', err);
            }

            // Loading from internet else
            try {
                fetch(
                    `${process.env.VUE_APP_API_TIMETABLE}/timetable/group/${this.groupId}`,
                )
                    .then(response => response.json())
                    .then(json => {
                        this.groupInfo = json;
                        if (
                            this.groupInfo.number === null ||
                            this.groupInfo.number === undefined
                        ) {
                            this.reinitTimetable();
                            return;
                        }
                        localStorage.setItem(
                            'timetable-group-info',
                            JSON.stringify(json),
                        );
                        document.dispatchEvent(this.headerEvent);
                    });
            } catch (error) {
                console.error('Failed to load group info');
            }
        },
        loadTimetableOnDate(date) {
            this.groupId =
                this.groupId ||
                JSON.parse(localStorage.getItem('timetable-group-info')).id ||
                localStorage.getItem('timetable-group-id');
            var time_start = new Date(date);
            var time_end = new Date(date);
            time_end.setDate(time_start.getDate() + 1);

            // Quering events from internet, trying 5 times with 1sec between
            try {
                retry(
                    () =>
                        fetchTimetable(time_start, time_end, this.groupId).then(
                            json => {
                                if (isToday(this.date, time_start)) {
                                    this.timetable = json.items;
                                    this.loaded = true;
                                    console.log(
                                        'Loaded from internet',
                                        json.items,
                                    );
                                }
                            },
                        ),
                    5,
                    1000,
                );
            } catch (error) {
                console.log('Can not load from internet', error);
            }

            // Loading from cache if exists
            let cached = JSON.parse(
                localStorage.getItem('timetable-cache') || '[]',
            );
            cached = cached.filter(value =>
                isToday(Date.parse(value.start_ts), date),
            );
            console.log('Loaded from cache', cached);
            if (!this.loaded && cached.length > 0) {
                this.timetable = cached;
                this.loaded = true;
                console.log(`Loaded ${cached.length} events from cache`);
            }
        },
        loadTimetableCache() {
            console.log('Caching timetable');
            // Загружает текущую неделю + следующую в кэш
            var time_start = getMonday(new Date());
            var time_end = new Date(time_start);
            time_end.setDate(time_start.getDate() + 14);
            retry(
                // Повтори загрузку недели трижды с интервалом 10 секунд
                () =>
                    fetchTimetable(time_start, time_end, this.groupId).then(
                        json => {
                            localStorage.setItem(
                                'timetable-cache',
                                JSON.stringify(json.items),
                            );
                            console.log(`Cached ${json.items.length} items`);
                        },
                    ),
                3,
                10000,
            );
        },
        changeDate(e) {
            var nextDate = new Date(this.date);
            if (e.detail.dir === 'left') {
                nextDate.setDate(this.date.getDate() + 1);
            } else if (e.detail.dir === 'right') {
                nextDate.setDate(this.date.getDate() - 1);
            } else {
                return;
            }
            this.loaded = false;
            this.timetable = [];
            document.dispatchEvent(
                new CustomEvent('change-date', {
                    detail: { date: nextDate },
                }),
            );
        },
        reinitTimetable() {
            this.loaded = false;
            this.groupId = undefined;
            this.groupInfo = { number: '' };
            this.timetable = [];
            localStorage.removeItem('timetable-group-id');
            localStorage.removeItem('timetable-group-info');
            localStorage.removeItem('timetable-cache');
            this.$router.push('/timetable/init');
        },
        syncDateResponseHandler(e) {
            this.date = e.detail.date;
        },
    },
};
</script>

<style scoped>
.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    cursor: default;
}
.clickable {
    cursor: pointer;
}

.no-events {
    margin-top: auto;
    margin-bottom: auto;
    align-self: center;
    justify-self: center;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: lightgray;
    text-transform: uppercase;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-top: 8px;
    min-height: calc(100vh - 56px * 2);
}

.weekday {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    color: var(--bs-primary);
    font-size: 1rem;
    padding: 8px;
    text-transform: uppercase;
    font-weight: bold;
}
.weekday .material-symbols-sharp {
    font-size: 0.8rem;
}

.lds-dual-ring {
    align-self: center;
    margin: 30% auto;
}
</style>
