<template>
    <div class="event-wrapper">
        <div v-if="!this.loaded" class="lds-dual-ring"></div>
        <div v-else class="wrapper">
            <div class="lesson-event">
                <b>{{this.eventInfo.name}}</b>
            </div>
            <ul>
                <GroupRow :eventNumber="this.eventInfo.group.number"
                             :eventDate="this.formatDate(this.date)"
                             :eventTime="this.DownTextFirst(this.eventInfo.start_ts, this.eventInfo.end_ts)"
                />
                <RoomRow v-for="room in this.eventInfo.room"
                            :key="room.id"
                            :room="room"
                            @click="this.clickRoom(room.id)"
                />
                <LecturerRow v-for="lecturer in this.eventInfo.lecturer" 
                            :key="lecturer.id"
                            :lecturer="lecturer"
                            @click="this.clickLecturer(lecturer.id)"
                />
            </ul>
        </div>
    </div>
</template>

<script>
import GroupRow from "@/components/GroupRow.vue";
import LecturerRow from "@/components/LecturerRow.vue";
import RoomRow from "@/components/RoomRow.vue";
export default {
    components: {LecturerRow, RoomRow, GroupRow},
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
            date = new Date(this.eventInfo.start_ts.slice(0,10));
            if (date) {
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
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
    },  
    watch: {
        eventInfo(elem) {
            let changeHeaderLayoutEvent = new CustomEvent("change-header-layout", {
                detail: {
                    layoutName: "back",
                    text: `${this.formatDate(new Date(elem.start_ts.slice(0, 10)))}, ${elem.start_ts.slice(11,16)}`
                },
            });
            document.dispatchEvent(changeHeaderLayoutEvent);
        }
    },
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
        height: calc(100vh - 56px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrapper {
        align-self: flex-start;
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