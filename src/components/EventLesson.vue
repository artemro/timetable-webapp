<template>
    <li class="event-item">
        <div class="photo-lecturer" v-if="lecturer.avatar_link">
            <div>
                <img v-bind:src="lecturer.avatar_link">
            </div>
        </div>
        <div class="event-item-icon" v-else>
            <div>
                <span class="material-symbols-sharp">person</span>
            </div>
        </div>
        <div class="event-item-information">
            <div class="event-item-header"><b>{{lecturer.first_name}} {{lecturer.middle_name}}</b></div>
            <div>{{lecturer.last_name}}</div>
        </div>
    </li>
</template>

<script>

export default {
    props: {
        lecturer: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            textUp: [
                "Группы",

            ],
            textDown: [],
            icon: [],
            date: new Date(),
        }
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
}
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