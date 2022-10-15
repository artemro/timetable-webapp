<template>
  <div class="event">
    <div class="time">
      <p>
        <b>{{ lesson.start_ts.slice(11, 16) }}</b>
      </p>
      <p>{{ lesson.end_ts.slice(11, 16) }}</p>
    </div>
    <div class="info">
      <p>
        <b class="title">{{ lesson.name }}</b>
      </p>
      <p
        class="extra"
        v-if="this.formatInfo(lesson.lecturer, lesson.room)"
        v-html="this.formatInfo(lesson.lecturer, lesson.room)"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatLecturer(info) {
      if (!info.middle_name) return `${info.last_name} ${info.first_name[0]}. `;
      return `${info.last_name}&nbsp;${info.first_name[0]}.&nbsp;${info.middle_name[0]}. `;
    },
    formatInfo(lecturer, room) {
      let total = "";

      room.forEach((element) => {
        total += `${element.name} `;
      });
      if (lecturer.length && room.length) total += `&bull;&ensp;`;
      lecturer.forEach((element) => {
        total += `${this.formatLecturer(element)}`;
      });

      return total;
    },
  },
};
</script>

<style scoped>
.event {
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  border-radius: 20px;
  background: var(--bs-primary-10);
  height: 78px;
  margin: 16px auto;
  padding: 10px 16px;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  overflow: hidden;
}
p {
  margin: 4px 0;
}
.time {
  width: 50px;
  font-size: 16px;
  flex: 0 0 50px;
}
div.info {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 0;
  height: 100%;
}
.info > p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
