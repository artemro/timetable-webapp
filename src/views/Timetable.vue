<template>
  <div class="timetable">
    <div v-if="!this.loaded" class="lds-dual-ring"></div>
    <div v-else class='container'>
      <div class='info'>{{ this.groupInfo.number }} группа</div>
      <div class="no-events" v-if="!this.timetable.length">пары отсутствуют</div>
      <ul v-else>
        <EventRow v-for="lesson of this.timetable" :key='lesson.id' :lesson="lesson" />
      </ul>

    </div>
  </div>
</template>

<script>
import EventRow from '@/components/EventRow.vue'
export default {
  name: "Timetable",

  mounted() {
    this.groupId = localStorage.getItem('timetable-group-id');
    this.loadGroupInfo();
    this.loadTimetableOnDate(this.$store.state.date);
  },
  data() {
    return {
      loaded: true,
      pageId: 1,
      groupId: null,
      groupInfo: { number: '' },
      timetable: [],
    };
  },
  components: {
    EventRow: EventRow,
  },
  methods: {
    loadGroupInfo() {
      var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/group/${this.groupId}`);
      fetch(url).then(response => response.json())
        .then(json => {
          this.groupInfo = json;
        })
    },
    loadTimetableOnDate(date) {
      var time_start = new Date(date);
      time_start.setHours(time_start.getHours() - date.getTimezoneOffset() / 60)
      console.log(time_start.toISOString())
      var time_end = new Date(time_start);
      time_end.setDate(time_start.getDate() + 1)
      var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/event/`),
        params = {
          start: time_start.toISOString().slice(0, 10),
          end: time_end.toISOString().slice(0, 10),
          limit: 0,
          offset: 0,
          group_id: this.groupId
        }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      this.loaded = false;
      fetch(url).then(response => response.json())
        .then(json => {
          this.timetable = json.items;
          this.loaded = true;
        })

    }
  },
  beforeMount() {
    document.dispatchEvent(new CustomEvent("change-page", { detail: this.pageId }));
    document.addEventListener('change-date', (e) => this.loadTimetableOnDate(e.detail));
  }
};

</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  width: auto;
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
  gap: 10px;
}

.timetable {
  padding: 10px;
  padding-top: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
  width: auto;
  overflow: scroll;
}

.info {
  height: 20px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: #000000;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}
</style>
