<template>
    <div class="event-wrapper">
        <div
            v-if="!loaded"
            class="lds-dual-ring"
        ></div>
        <div
            v-else
            class="wrapper"
        >
            <div class="lesson-event">
                <b>{{ eventInfo.name }}</b>
            </div>
            <ul>
                <GroupRow
                    :event-number="eventInfo.group.number"
                    :event-date="formatDate(date)"
                    :event-time="
                        DownTextFirst(eventInfo.start_ts, eventInfo.end_ts)
                    "
                />
                <RoomRow
                    v-for="room in eventInfo.room"
                    :key="room.id"
                    :room="room"
                    @click="clickRoom(room.id)"
                />
                <LecturerRow
                    v-for="lecturer in eventInfo.lecturer"
                    :key="lecturer.id"
                    :lecturer="lecturer"
                    @click="clickLecturer(lecturer.id)"
                />
            </ul>
            <div class="comment-container">
                <b>Комментарии</b>
                <p
                    v-if="getCurComments().length == 0"
                    class="row"
                >
                    <i class="text-secondary text-center"
                        >Еще нет комментариев</i
                    >
                </p>
                <div
                    v-for="(comment, i) in getCurComments()"
                    :key="i"
                    class="comment"
                >
                    <span
                        class="material-symbols-sharp delete-btn text-danger"
                        @click="dropComment(i)"
                    >
                        delete
                    </span>
                    <p>{{ comment }}</p>
                </div>
                <form @submit.prevent="sendComment">
                    <textarea
                        id="comment-text"
                        name="comment-text"
                        rows="3"
                        class="form-control"
                    ></textarea>
                    <input
                        type="submit"
                        class="btn form-control"
                        value="Сохранить на этом устройстве"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import GroupRow from '@/components/GroupRow.vue';
import LecturerRow from '@/components/LecturerRow.vue';
import RoomRow from '@/components/RoomRow.vue';

export default {
    components: { LecturerRow, RoomRow, GroupRow },
    data() {
        return {
            loaded: false,
            eventId: this.$route.params.eventId,
            eventInfo: {},
            date: new Date(),
            comments: {},
        };
    },
    watch: {
        eventInfo(elem) {
            let changeHeaderLayoutEvent = new CustomEvent(
                'change-header-layout',
                {
                    detail: {
                        layoutName: 'back',
                        text: `${this.formatDate(
                            new Date(elem.start_ts.slice(0, 10)),
                        )}, ${elem.start_ts.slice(11, 16)}`,
                    },
                },
            );
            document.dispatchEvent(changeHeaderLayoutEvent);
        },
    },
    beforeMount() {
        this.loadEventInfo();
        console.log(this.eventInfo);
        let changeHeaderLayoutEvent = new CustomEvent('change-header-layout', {
            detail: {
                layoutName: 'back',
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);

        this.comments = JSON.parse(
            localStorage.getItem('timetable-event-comment') || '{}',
        );
    },
    beforeUnmount() {
        document.dispatchEvent(
            new CustomEvent('change-date', {
                detail: {
                    date: new Date(this.eventInfo.start_ts.slice(0, 10)),
                },
            }),
        );
    },
    methods: {
        loadEventInfo() {
            var url = new URL(
                `${process.env.VUE_APP_API_TIMETABLE}/timetable/event/${this.eventId}`,
            );
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.eventInfo = json;
                    this.loaded = true;
                });
        },
        formatDate(date) {
            date = new Date(this.eventInfo.start_ts.slice(0, 10));
            if (date) {
                var options = {
                    month: 'long',
                    day: 'numeric',
                };
            }
            return date.toLocaleString('ru', options);
        },
        DownTextFirst(stringStart, stringEnd) {
            return stringStart.slice(11, 16) + ' — ' + stringEnd.slice(11, 16);
        },
        clickRoom(roomId) {
            this.$router.push(`/timetable/room/${roomId}`);
        },
        clickLecturer(lecturerId) {
            this.$router.push(`/timetable/lecturer/${lecturerId}`);
        },
        getCurComments() {
            let cur = this.comments[this.eventId];
            if (!cur) {
                cur = [];
                this.comments[this.eventId] = cur;
            }
            return cur;
        },
        sendComment(event) {
            let curComments = this.getCurComments();
            let newComment = event.target[0].value.trim();
            if (newComment !== '') {
                event.target[0].value = '';
                curComments.push(newComment);
                localStorage.setItem(
                    'timetable-event-comment',
                    JSON.stringify(this.comments),
                );
            }
        },
        dropComment(index) {
            let curComments = this.getCurComments();
            curComments.splice(index, 1);
            localStorage.setItem(
                'timetable-event-comment',
                JSON.stringify(this.comments),
            );
        },
    },
};
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0;
}
.event-wrapper {
    padding: 10px 24px;
    min-height: calc(100vh - 56px * 2);
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

.comment-container {
    width: 100%;
    padding: 8px;
}

.comment {
    display: block;
    width: 100%;
}

.comment > .delete-btn {
    display: block;
    float: right;
    clear: right;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

    cursor: pointer;
}
</style>
