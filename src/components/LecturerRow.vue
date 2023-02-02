<template>
    <li class="event-item noselect">
        <div
            v-if="lecturer.avatar_link"
            class="photo-lecturer"
        >
            <div>
                <img :src="lecturer.avatar_link" />
            </div>
        </div>
        <div
            v-else
            class="event-item-icon"
        >
            <div class="noselect">
                <span class="material-symbols-sharp">person</span>
            </div>
        </div>
        <div
            v-if="lecturer.first_name[2]"
            class="event-item-information"
        >
            <div class="event-item-header">
                <b>{{ lecturer.first_name }} {{ lecturer.middle_name }}</b>
            </div>
            <div>{{ lecturer.last_name }}</div>
        </div>
        <div
            v-else
            class="event-item-information"
        >
            <b
                >{{ lecturer.first_name }} {{ lecturer.middle_name }}
                {{ lecturer.last_name }}</b
            >
        </div>
    </li>
</template>

<script>
import '@/components/row.css';

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
                    month: 'long',
                    day: 'numeric',
                };
                return date.toLocaleString('ru', options);
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
