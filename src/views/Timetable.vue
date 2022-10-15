<template>
  <div class="timetable">
    <div v-if="!this.loaded" class="lds-dual-ring"></div>
    <div v-else class="container">
      <div class="weekday">
        <span>
          <span class="material-symbols-sharp"> arrow_back_ios </span>
          {{ yesterdayWeekdayFormated }}
        </span>
        <span>{{ todayWeekdayFormated }}</span>
        <span>
          {{ tomorrowWeekdayFormated }}
          <span class="material-symbols-sharp"> arrow_forward_ios </span>
        </span>
      </div>
      <div class="no-events" v-if="!this.timetable.length">
        пары отсутствуют
      </div>
      <div v-else>
        <EventRow
          v-for="lesson of this.timetable"
          :key="lesson.id"
          :lesson="lesson"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventRow from "@/components/EventRow.vue";
import retry from "@/utils/Retrying.js";
import { fetchTimetable } from "@/utils/FetchTimetable.js";
import { getMonday, isToday } from "@/utils/Dates.js";

export default {
  name: "Timetable",
  data() {
    return {
      loaded: true,
      pageId: 1,
      date: new Date(),
      groupId: null,
      groupInfo: { number: "" },
      timetable: [],
    };
  },
  components: {
    EventRow: EventRow,
  },
  methods: {
    loadGroupInfo() {
      // Loading from cache if exists
      try {
        this.groupInfo = JSON.parse(
          localStorage.getItem("timetable-group-info") || '{"number": ""}'
        );
      } catch (err) {
        console.log("Can not take group info from cache", err);
      }

      // Loading from internet else
      try {
        fetch(
          `${process.env.VUE_APP_API_TIMETABLE}/timetable/group/${this.groupId}`
        )
          .then((response) => response.json())
          .then((json) => {
            this.groupInfo = json;
            localStorage.setItem("timetable-group-info", JSON.stringify(json));
          });
      } catch (error) {
        console.error("Failed to load group info");
      }
    },
    loadTimetableOnDate(date) {
      var time_start = new Date(date);
      var time_end = new Date(date);
      time_end.setDate(time_start.getDate() + 1);

      // Quering events from internet, trying 5 times with 1sec between
      try {
        retry(
          () =>
            fetchTimetable(time_start, time_end, this.groupId).then((json) => {
              if (isToday(this.date, time_start)) {
                this.timetable = json.items;
                this.loaded = true;
                console.log("Loaded from internet", json.items);
              }
            }),
          5,
          1000
        );
      } catch (error) {
        console.log("Can not load from internet", error);
      }

      // Loading from cache if exists
      let cached = JSON.parse(localStorage.getItem("timetable-cache") || "[]");
      cached = cached.filter((value) =>
        isToday(Date.parse(value.start_ts), date)
      );
      console.log("Loaded from cache", cached);
      if (!this.loaded && cached.length > 0) {
        this.timetable = cached;
        this.loaded = true;
        console.log(`Loaded ${cached.length} events from cache`);
      }
    },
    loadTimetableCache() {
      console.log("Caching timetable");
      // Загружает текущую неделю + следующую в кэш
      var time_start = getMonday(new Date());
      var time_end = new Date(time_start);
      time_end.setDate(time_start.getDate() + 14);
      retry(
        // Повтори загрузку недели трижды с интервалом 10 секунд
        () =>
          fetchTimetable(time_start, time_end, this.groupId).then((json) => {
            localStorage.setItem("timetable-cache", JSON.stringify(json.items));
            console.log(`Cached ${json.items.length} items`);
          }),
        3,
        10000
      );
    },
    swipeEventHandler(e) {
      this.loaded = false;
      this.timetable = [];
      var nextDate = new Date(this.date);
      if (e.detail.dir == "left") {
        nextDate.setDate(this.date.getDate() + 1);
      } else if (e.detail.dir == "right") {
        nextDate.setDate(this.date.getDate() - 1);
      } else {
        return;
      }
      document.dispatchEvent(
        new CustomEvent("change-main-date", { detail: { date: nextDate } })
      );
    },
  },
  computed: {
    todayWeekdayFormated() {
      const wdname = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ];
      return wdname[this.date.getDay()];
    },
    yesterdayWeekdayFormated() {
      const wdname = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
      return wdname[(this.date.getDay() + 6) % 7]; // День недели через 6 дней == День недели вчера, но точно положительный =)
    },
    tomorrowWeekdayFormated() {
      const wdname = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
      return wdname[(this.date.getDay() + 1) % 7];
    },
  },
  watch: {
    date(newDate) {
      this.loaded = false;
      // 5 раз с интервалом в 1 секунду попробуй скачать расписание
      this.loadTimetableOnDate(newDate);
    },
  },
  beforeMount() {
    document.dispatchEvent(
      new CustomEvent("change-page", { detail: this.pageId })
    );
    document.addEventListener(
      "change-date",
      (e) => (this.date = e.detail.date)
    );
  },
  updated() {
    document.dispatchEvent(
      new CustomEvent("change-page", { detail: this.pageId })
    );
  },
  mounted() {
    this.groupId = localStorage.getItem("timetable-group-id");
    this.loadGroupInfo();
    document.dispatchEvent(new CustomEvent("sync-date"));
    // обработка свайпов
    document.addEventListener("swipe", this.swipeEventHandler);

    // Загружаем кэш в память
    this.loadTimetableCache();
  },
  beforeUnmount() {
    document.removeEventListener("swipe", this.swipeEventHandler);
  },
};
</script>

<style scoped>
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
}

.timetable {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
  width: auto;
  overflow: scroll;
}

.weekday {
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  color: var(--bs-primary);
  font-size:1rem;
  padding: 8px;
  text-transform: uppercase;
  font-weight: bold;
}
.weekday .material-symbols-sharp {
  font-size:0.8rem;
}
</style>
