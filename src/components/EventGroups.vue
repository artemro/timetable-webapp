<template>
    <li class="event-item" v-for="(item, index) in this.itemInformation"
                            :key="item.id">
        <div class="event-item-icon" v-if="!index">
            <span class="material-symbols-sharp">schedule</span>
        </div>
        <div class="event-item-icon" v-else>
            <span class="material-symbols-sharp">group</span>
        </div>
        <div class="event-item-information">
            <div v-if="!index">
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
    
    data() {
        return {
            itemInformation:[{
                id: 1,
                icon: 0
            }, 
            {
                id: 2,
                icon: 1
            }]
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
