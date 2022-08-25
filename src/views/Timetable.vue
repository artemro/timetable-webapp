<template>
  <div class="timetable">
    <div class = 'container'>
      <div class='info'>{{this.timetable.number}} группа</div>
      <ul>
        <EventRow 
          v-for= "lesson of this.timetable.events" :key='lesson.id' :lesson="lesson"
        />
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
    this.loadTimetableOnDate(this.$store.state.date)  
  },
  data() {
    return {
      pageId: 1,
      groupId: null,
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
  components:{
    EventRow: EventRow,
  },
  methods:{
    loadTimetableOnDate(date) {
      var time_start = new Date(date);
      var time_end = new Date();
      time_end.setDate(time_start.getDate() + 1)
      var url = new URL(`https://timetable.api.test.profcomff.com/timetable/group/${this.groupId}`),
        params = {start: time_start.toISOString().slice(0,10), end: time_end.toISOString().slice(0,10)}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.timetable = json
        })
    }
  }
};
</script>

<style scoped>
  ul{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;
    width:auto;
  }
  .timetable{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;
    width:auto;
    padding-top: 66px;
  }
  .info{
    height: 20px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    /* identical to box height, or 100% */

    letter-spacing: 0.4px;

    color: #000000;


    /* Inside auto layout */

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }
</style>
