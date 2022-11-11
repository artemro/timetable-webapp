<template>
    <div class="event-wrapper">
        <div v-if="!this.loaded" class="lds-dual-ring"></div>
        <div v-else>
            <div class="lesson-event">
                <b>{{this.eventInfo.name}}</b>
            </div>
            <ul>
                <EventGroups :eventNumber="this.eventInfo.group.number"
                             :eventDate="this.formatDate(this.date)"
                             :eventTime="this.DownTextFirst(this.eventInfo.start_ts, this.eventInfo.end_ts)"
                />
                <EventRoom v-for="room in this.eventInfo.room"
                            :key="room.id"
                            :room="room"
                            @click="this.clickRoom(room.id)"
                />
                <EventLesson v-for="lecturer in this.eventInfo.lecturer" 
                            :key="lecturer.id"
                            :lecturer="lecturer"
                            @click="this.clickLecturer(lecturer.id)"
                />
            </ul>
        </div>
    </div>
</template>

<script>
import EventGroups from "@/components/EventGroups.vue";
import EventLesson from "@/components/EventLesson.vue";
import EventRoom from "@/components/EventRoom.vue";
export default {
    components: {EventLesson, EventRoom, EventGroups},
    data() {
        return {
            loaded: false,
            eventId: this.$route.params.eventId,
            eventInfo: {},  
            date: new Date(),
        };
    },

    methods: {
        loadEventInfo() {
            var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/event/${this.eventId}`);
            fetch(url).then(response => response.json())
                .then(json => {
                this.eventInfo = json;
                this.loaded = true;
            });
        },
        formatDate(date) {
            this.date = new Date(this.eventInfo.start_ts.slice(0, 10));
            if (this.date) {
                var options = {
                    month: "long",
                    day: "numeric",
                };
            }
            return date.toLocaleString("ru", options);
        },
        DownTextFirst(stringStart, stringEnd) {
            return stringStart.slice(11,16) + ' — ' + stringEnd.slice(11,16);
        }, 
        clickRoom(roomId) {
            this.$router.push(`/timetable/room/${roomId}`);
            try {
                fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
                method: "POST",
                cache: "no-cache",
                redirect: "follow",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: localStorage.getItem("marketing-id"),
                    action: "route to",
                    path_from: "/timetable",
                    path_to: "/timetable/room",
                }),
            });
            } catch {
                //Failed, skips
            }

        },
        clickLecturer(lecturerId) {
            this.$router.push(`/timetable/lecturer/${lecturerId}`);
            try {
                fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
                method: "POST",
                cache: "no-cache",
                redirect: "follow",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: localStorage.getItem("marketing-id"),
                    action: "route to",
                    path_from: "/timetable",
                    path_to: "/timetable/lecturer",
                }),
            });
        } catch {
            //Failed, skips
        }
        }
    },

    beforeMount() {
        this.loadEventInfo();
        console.log(this.eventInfo);
        let changeHeaderLayoutEvent = new CustomEvent("change-header-layout", {
            detail: {
                layoutName: "back",
                text: "Вернуться к расписанию",
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
        
    },  
    beforeUnmount () {
        document.dispatchEvent(new CustomEvent("change-main-date", {
            detail: {
                date: new Date(this.eventInfo.start_ts.slice(0, 10))
            }
        }))
    }
}
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
    .event-wrapper {
        padding: 32px 24px 0px 24px;
        height: calc(100% - 56px);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .lds-dual-ring {
        align-self: center;
    }

    .lesson-event {
        font-size: 24px;
        margin-bottom: 8px;
    }
    
    @media (min-width: 768px) {
        .event-wrapper {
            max-width: 640px;
            margin: auto;
        } 

        b {
            text-align: center;
        }
    }
</style>

<style>
.event-item {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style-type: none;
    height: 78px; 
    border-radius: 20px;
    display: flex;
    align-items: center;
} 
.event-item:nth-child(n+3) {
    margin-top: 16px;
    background-color:rgba(0, 0, 0, 0.06);
}

.event-item:last-of-type {
    margin-bottom: 80px;
}

.event-item:nth-child(n+3):hover {
  background: var(--bs-primary-20);
}
.event-item-icon {
    min-width: 88px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.event-item-header:nth-of-type(n+3) {
    font-weight: bold;
}

.event-item-information:nth-of-type(n+3) {
    font-size: 16px;
}

.event-item-information {
    font-size: 18px;
}
</style>