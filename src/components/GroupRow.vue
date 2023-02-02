<template>
    <li
        v-for="item in 2"
        :key="item.id"
        class="event-item noselect"
    >
        <div
            v-if="item == 1"
            class="event-item-icon noselect"
        >
            <span class="material-symbols-sharp">group</span>
        </div>
        <div
            v-else
            class="event-item-icon noselect"
        >
            <span class="material-symbols-sharp">schedule</span>
        </div>
        <div class="event-item-information">
            <div v-if="item == 1">
                <div>Группа</div>
                <div>{{ eventNumber }}</div>
            </div>
            <div v-else>
                <div>{{ eventDate }}</div>
                <div>{{ eventTime }}</div>
            </div>
        </div>
    </li>
</template>

<script>
import '@/components/row.css';

export default {
    props: {
        eventNumber: {
            type: String,
        },
        eventTime: {
            type: String,
        },
        eventDate: {
            type: String,
        },
    },
};
</script>

<style scoped>
.material-symbols-sharp {
    color: #00004b;
    font-size: 30px;
}
</style>
