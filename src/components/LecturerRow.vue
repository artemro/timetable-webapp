<template>
  <li class="event-item noselect">
    <div class="photo-lecturer" v-if="lecturer.avatar_link">
      <div>
        <img v-bind:src="lecturer.avatar_link" />
      </div>
    </div>
    <div class="event-item-icon" v-else>
      <div class="noselect">
        <span class="material-symbols-sharp">person</span>
      </div>
    </div>
    <div class="event-item-information" v-if="lecturer.first_name[2]">
      <div class="event-item-header">
        <b>{{ lecturer.first_name }} {{ lecturer.middle_name }}</b>
      </div>
      <div>{{ lecturer.last_name }}</div>
    </div>
    <div class="event-item-information" v-else>
      <b
        >{{ lecturer.first_name }} {{ lecturer.middle_name }}
        {{ lecturer.last_name }}</b
      >
    </div>
  </li>
</template>

<script>
import "@/components/row.css";

export default {
  props: {
    lecturer: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      textDown: [],
      icon: [],
      date: new Date(),
    };
  },
  methods: {
    formatDate(date) {
      if (this.date) {
        var options = {
          month: "long",
          day: "numeric",
        };
        return date.toLocaleString("ru", options);
      }
    },
  },
};
</script>

<style scoped>
.material-symbols-sharp {
  font-size: 36px;
}

.photo-lecturer {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
</style>
