<template>
    <li>
        <div class="time">
            <b>{{lesson.start_ts.slice(11,16)}}</b>&ensp;{{lesson.end_ts.slice(11,16)}}
        </div>
        <div class="info">
            <div>
                <b>{{lesson.name}}</b>
            </div>
            <div>
                <span 
                    v-for="info in lesson.lecturer" :key="info.id" :info="info"
                >
                    {{formatLecturer(info)}}&ensp;
                </span> 
                <span v-if="lesson.lecturer && lesson.room"> &bull;&ensp;
                </span> 
                <span 
                    v-for="info in lesson.room" :key="info.id" :info="info"
                >
                    {{info.name}}&ensp;
                </span>
            </div>
        </div>
    </li>
</template>
<script>
export default{
    props:{
        lesson:{
            type: Object,
            required: true
        }
    },
    methods:{
        formatLecturer(info){
            if (!info.middle_name)
                return `${info.last_name} ${info.first_name[0]}.`;
            return `${info.last_name} ${info.first_name[0]}.${info.middle_name[0]}.`;
        }
    }
}
</script>

<style scoped>
    li{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 11px 11Spx;
        gap: 24px;
        height: 80px;
        background: #F8F8F8;

        /* Inside auto layout */

        flex: 1;
        order: 0;
        align-self: stretch;
        min-width: 300px;
        width: auto;
        list-style: none;
    }
    .time{
        width: 50px;

        font-size: 16px;
        line-height: 28px;
        /* or 175% */
        color: #000000;
        padding-left: 10px;

    }

    .info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 10px;
        gap: 5px;

        /* Inside auto layout */

        flex: 1;
        order: 1;
    }
</style>