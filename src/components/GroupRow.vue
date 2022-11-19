<template>
    <li class="event-item" v-for="item in 2" :key="item.id">
        <div class="event-item-icon" v-if="item==1">
            <span class="material-symbols-sharp">schedule</span>
        </div>
        <div class="event-item-icon" v-else>
            <span class="material-symbols-sharp">group</span>
        </div>
        <div class="event-item-information">
            <div v-if="item==1">
                <div>Группа</div>
                <div>{{eventNumber}}</div>
            </div>
            <div v-else>
                <div>{{eventDate}}</div>
                <div>{{eventTime}}</div>
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
        }
    },
}
</script>

<style scoped>
.material-symbols-sharp {
    color: #00004B;
    font-size: 30px;
}

</style>
