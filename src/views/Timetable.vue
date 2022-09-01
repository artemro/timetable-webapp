<template>
  <div class="timetable">
    <div v-if="!this.loaded" class="lds-dual-ring"></div>
    <div v-else class='container'>  
      <div class='info'>{{ this.groupInfo.number }} группа</div>
      <div class="no-events" v-if="!this.timetable.length">мероприятия отсутствуют</div>
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
    this.$store.commit("changePage", this.pageId);
    this.loadGroupInfo();
    this.loadTimetableOnDate(this.$store.state.date);
  },
  data() {
    return {
      loaded: true,
      pageId: 1,
      groupId: null,
      groupInfo: {number:''},
      timetable: [],
    };
  },
  computed: {
    choosenDate() {
      return this.$store.state.date
    }
  },
  watch: {
    choosenDate(newValue) {
      this.loadTimetableOnDate(newValue)
    }
  },
  components: {
    EventRow: EventRow,
  },
  methods: {
    loadGroupInfo(){
      var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/group/${this.groupId}`);
      this.loaded = false;
      fetch(url).then(response => response.json())
        .then(json => {
          this.groupInfo = json;
          this.loaded = true;
        })
    },
    loadTimetableOnDate(date) {
      var time_start = new Date(date);
      time_start.setHours(time_start.getHours() - date.getTimezoneOffset()/60)
      console.log(time_start.toISOString())
      var time_end = new Date(time_start);
      time_end.setDate(time_start.getDate() + 1)
      var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/event/`),
        params = { 
          start: time_start.toISOString().slice(0, 10), 
          end: time_end.toISOString().slice(0, 10),
          limit: 0,
          offset: 0,
          group_id: this.groupId }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      this.loaded = false;
      fetch(url).then(response => response.json())
        .then(json => {
          this.timetable = json.items;
          this.loaded = true;
        })

    }
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
  justify-content: start;
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

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid lightgray;
  border-color: lightgray transparent lightgray transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
