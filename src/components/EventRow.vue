<template>
    <div class="event noselect">
        <div class="time">
            <p>
                <b>{{ lesson.start_ts.slice(11, 16) }}</b>
            </p>
            <p>{{ lesson.end_ts.slice(11, 16) }}</p>
        </div>
        <div class="info">
            <p>
                <b class="title">{{ lesson.name }}</b>
            </p>
            <p
                v-if="formatInfo(lesson.lecturer, lesson.room)"
                class="extra"
                v-html="formatInfo(lesson.lecturer, lesson.room)"
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        lesson: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatLecturer(info) {
            if (!info.middle_name)
                return `${info.last_name} ${info.first_name[0]}.`;
            return `${info.last_name}&nbsp;${info.first_name[0]}.&nbsp;${info.middle_name[0]}.`;
        },
        formatInfo(lecturer, room) {
            let lecturers = [];
            let rooms = [];

            room.forEach(e => rooms.push(e.name));
            lecturer.forEach(e => lecturers.push(this.formatLecturer(e)));
            lecturers = lecturers.join(', ');
            rooms = rooms.join(', ');
            if (lecturer.length && room.length) {
                return `${lecturers} &bull;&ensp;${rooms}`;
            } else {
                return `${lecturers}${rooms}`;
            }
        },
    },
};
</script>

<style scoped>
.event {
    display: flex;
    flex-flow: row nowrap;
    gap: 16px;
    border-radius: 20px;
    background: var(--bs-primary-10);
    transition: background-color 0.5s ease;
    height: 78px;
    margin: 16px auto;
    padding: 10px 16px;
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    overflow: hidden;
}
.event:hover {
    background: var(--bs-primary-20);
}
.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    cursor: default;
}
p {
    margin: 0;
}
div.time,
div.info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    font-size: 16px;
    height: 100%;
}
div.time {
    width: 50px;
    flex: 0 0 50px;
}
div.info {
    min-width: 0;
}
.info > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
