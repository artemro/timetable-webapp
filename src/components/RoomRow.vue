<template>
  <li class="event-item noselect">
    <div class="event-item-icon">
      <span class="material-symbols-sharp">location_on</span>
    </div>
    <div class="event-item-information">
      <div class="event-item-header">
        <b>{{ room.name }}</b>
      </div>
      <div>
        <span v-if="room.building">{{ room.building }}</span>
        <span v-if="room.building && room.direction"> • </span>
        <span v-if="room.direction">{{ roomDirection(room.direction) }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import "@/components/row.css";

export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  methods: {
    roomDirection(direction) {
      if (direction === "North") return "Север";
      if (direction === "South") return "Юг";
    },
  },
};
</script>

<style scoped>
.material-symbols-sharp {
  font-size: 30px;
}
</style>
