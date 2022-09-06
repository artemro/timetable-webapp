<template>
    <li>
        <div class="time">
            <b>{{lesson.start_ts.slice(11,16)}}</b>&ensp;{{lesson.end_ts.slice(11,16)}}
        </div>
        <div class="info">
            <div>
                <b>{{lesson.name}}</b>
            </div>
            <div class="extra">
                <span v-html="this.formatInfo(lesson.lecturer, lesson.room)">
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
                return `${info.last_name} ${info.first_name[0]}. `;
            return `${info.last_name} ${info.first_name[0]}.${info.middle_name[0]}. `;
        },
        formatInfo(lecturer, room){
            let total = '';
            
            room.forEach(element => {
                total += `${element.name} `
            })
            if (lecturer.length && room.length)
                total += `&bull;&ensp;`;
            lecturer.forEach(element => {
                total += `${this.formatLecturer(element)}`;
            });
            
            return total;
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
        height: min-content;
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
    div.extra{
        display: flex;
        gap:5%;
        width: 90%;
    }
    span{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex-wrap: nowrap;
        text-align: center;
    }
    .info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 10px;
        gap: 5px;
        text-overflow: ellipsis;
        /* Inside auto layout */
        flex-wrap: nowrap;
        flex: 1;
        order: 1;
    }
</style>