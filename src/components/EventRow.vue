<template>
    <li class="lection-item" v-on:click="clickCard">
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
    <div class="info-layer" v-if="this.showCard && (lesson.lecturer[0] || lesson.room[0])">
        <div class="lection-information" v-click-outside="clickCard">
            <div class="close" @click="clickCard">
            </div>
            <div class="lection-header">
                <b>Предмет</b>
            </div>
            <div class="lection-boarder">
                {{lesson.name}}
            </div>
            <div class="lection-header">
                <b>Кабинет</b>
            </div>
            <div class="room-info" v-if="lesson.room.length">
                <span class="lection-boarder">
                    <span class="svg-wrapper">
                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 11.75C11.9632 11.75 12.3585 11.5792 12.6859 11.2375C13.0134 10.8958 13.1771 10.4833 13.1771 10C13.1771 9.51667 13.0134 9.10417 12.6859 8.7625C12.3585 8.42083 11.9632 8.25 11.5 8.25C11.0368 8.25 10.6415 8.42083 10.3141 8.7625C9.98663 9.10417 9.82291 9.51667 9.82291 10C9.82291 10.4833 9.98663 10.8958 10.3141 11.2375C10.6415 11.5792 11.0368 11.75 11.5 11.75ZM11.5 20.025C13.6243 18.0083 15.1936 16.1792 16.2078 14.5375C17.222 12.8958 17.7292 11.45 17.7292 10.2C17.7292 8.23333 17.1262 6.625 15.9203 5.375C14.7144 4.125 13.241 3.5 11.5 3.5C9.75902 3.5 8.28558 4.125 7.07968 5.375C5.87378 6.625 5.27083 8.23333 5.27083 10.2C5.27083 11.45 5.78993 12.8958 6.82812 14.5375C7.86631 16.1792 9.42361 18.0083 11.5 20.025ZM11.5 22C8.92847 19.7167 7.00781 17.5958 5.73802 15.6375C4.46822 13.6792 3.83333 11.8667 3.83333 10.2C3.83333 7.7 4.60399 5.70833 6.14531 4.225C7.68663 2.74167 9.47152 2 11.5 2C13.5285 2 15.3134 2.74167 16.8547 4.225C18.396 5.70833 19.1667 7.7 19.1667 10.2C19.1667 11.8667 18.5318 13.6792 17.262 15.6375C15.9922 17.5958 14.0715 19.7167 11.5 22Z" fill="black"/>
                        </svg>
                    </span>
                    <span>{{lesson.room[0].name}}</span>
                </span>
                <span class="lection-boarder" v-if="lesson.room[0].direction">
                {{lesson.room[0].direction}}
                </span>
            </div>
            <div class="lection-boarder" v-else>Не указан</div>
            <ul class="lecturer-wrapper">
                <li class="lecturer-item" v-for="item in lesson.lecturer" :key="item.id"> 
                    <div class="lection-header">
                        <b>Преподаватель</b> 
                        <span class="svg-wrapper svg-lecturer">
                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 8.69565C8.19375 8.69565 7.125 8.28986 6.29375 7.47826C5.4625 6.66667 5.04688 5.62319 5.04688 4.34783C5.04688 3.07246 5.4625 2.02899 6.29375 1.21739C7.125 0.405797 8.19375 0 9.5 0C10.8062 0 11.875 0.405797 12.7063 1.21739C13.5375 2.02899 13.9531 3.07246 13.9531 4.34783C13.9531 5.62319 13.5375 6.66667 12.7063 7.47826C11.875 8.28986 10.8062 8.69565 9.5 8.69565ZM0 18V15.2754C0 14.5411 0.188021 13.913 0.564062 13.3913C0.940104 12.8696 1.425 12.4734 2.01875 12.2029C3.34479 11.6232 4.61641 11.1884 5.83359 10.8986C7.05078 10.6087 8.27292 10.4638 9.5 10.4638C10.7271 10.4638 11.9443 10.6135 13.1516 10.913C14.3589 11.2126 15.6255 11.6425 16.9516 12.2029C17.5651 12.4734 18.0599 12.8696 18.4359 13.3913C18.812 13.913 19 14.5411 19 15.2754V18H0ZM1.78125 16.2609H17.2188V15.2754C17.2188 14.9662 17.1247 14.6715 16.9367 14.3913C16.7487 14.1111 16.5161 13.9034 16.2391 13.7681C14.9724 13.1691 13.8146 12.7585 12.7656 12.5362C11.7167 12.314 10.6281 12.2029 9.5 12.2029C8.37187 12.2029 7.27344 12.314 6.20469 12.5362C5.13594 12.7585 3.97813 13.1691 2.73125 13.7681C2.45417 13.9034 2.22656 14.1111 2.04844 14.3913C1.87031 14.6715 1.78125 14.9662 1.78125 15.2754V16.2609ZM9.5 6.95652C10.2719 6.95652 10.9102 6.71014 11.4148 6.21739C11.9195 5.72464 12.1719 5.10145 12.1719 4.34783C12.1719 3.5942 11.9195 2.97101 11.4148 2.47826C10.9102 1.98551 10.2719 1.73913 9.5 1.73913C8.72812 1.73913 8.08984 1.98551 7.58516 2.47826C7.08047 2.97101 6.82812 3.5942 6.82812 4.34783C6.82812 5.10145 7.08047 5.72464 7.58516 6.21739C8.08984 6.71014 8.72812 6.95652 9.5 6.95652Z" fill="black"/>
                            </svg>
                        </span>
                    </div>
                    <div class="lecturer-information">
                        <button class="button previous" 
                                v-if="this.currentLecturer > 1"
                                @click = "clickLeft()">
                                <span class="material-symbols-sharp button-left">       
                                arrow_back_ios
                                </span>
                        </button>
                        <div v-if="item.avatar_link">
                            <img class="lecturer-picture" v-bind:src="item.avatar_link" alt="">
                        </div>
                        <div class="lecturer-picture-none" v-else>
                            Фото нет :(
                        </div>
                        <div class="lecturer-name">
                            <div>{{item.last_name}}</div>
                            <div>{{item.first_name}}</div>
                            <div v-if="item.middle_name.length">{{item.middle_name}}</div>
                        </div>
                        <button class="button next" 
                                v-if="this.currentLecturer < lesson.lecturer.length"
                                @click = "clickRight()">
                                <span class="material-symbols-sharp">
                                arrow_forward_ios
                                </span></button>
                    </div>
                    <div class="lecturer-description">
                        <b>Дополнительная информация</b>
                        <div v-if="item.description">{{item.description}}</div>
                        <div class="description-none" v-else>Пока здесь ничего нет :(</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
export default{
    directives: {
        clickOutside: vClickOutside.directive,
    },
    props:{
        lesson:{
            type: Object,
            required: true,
        }
    }, 
    data() {
        return {
            showCard: false,
            currentLecturer: 1, 
        };
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
        }, 

        clickCard () {
            this.showCard=!this.showCard;
            this.currentLecturer = 1;
        },

        displayLecturer() {
            const lecturers = document.querySelectorAll(".lecturer-item"); 
            for (let i = 1; i <= lecturers.length; i++) {
                if (i == this.currentLecturer) {
                    lecturers[i-1].style.display = "block"; 
                }
                else lecturers[i-1].style.display = "none";
            }
            return true;
        },

        clickRight() {
            this.currentLecturer+=1;
            this.displayLecturer();
        },

        clickLeft() {
            this.currentLecturer-=1;
            this.displayLecturer();
        },
    }
}
</script>

<style scoped>
    .lection-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 11px 11px;
        gap: 24px;
        height: min-content;
        background: #F8F8F8;

        /* Inside auto layout */

        flex: 1;
        order: 0;
        align-self: stretch;
        min-width: 300px;
        width: auto;
    } 
    li {
        list-style: none;
    } 
    ul {
        padding: 0;
    }
    .lection-item:hover {
        opacity: 0.6;
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
        gap: 5%;
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
    .info-layer {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 5;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
    }

    .lection-information {
        width: 330px;
        height: 450px;
        background-color: #fff;
        margin: auto;
        padding: 25px 30px 30px 30px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 10px 3px #161616;
    }

    .close {
        position: absolute;
        width: 32px;
        height: 32px;
        opacity: 0.8;
    }
    .close:hover {
        opacity: 1;
        cursor: pointer;
    }
    .close:before, .close:after {
        position: absolute;
        left: 285px;
        bottom: 65px;
        content: '';
        height: 33px;
        width: 3px;
        background-color: #fff;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }

    .lection-header {
        margin-bottom: 4px;
    }

    .lection-boarder {
        max-width: 270px;
        width: intrinsic;          
        width: -moz-max-content;    
        width: -webkit-max-content; 
        font-size: 16px;
        padding: 8px;
        background-color: #f8f8f8;
        border-radius: 5px;
        margin-bottom: 20px;
        margin-right: 8px;
        line-height: 24px;
    }

    .room-info {
        margin-bottom: 20px; 
    }

    .svg-wrapper {
        display: inline-block;
        height: 24px;
        position: relative; 
        top: 5px; 
        margin-right: 3px;
    } 

    .lecturer-wrapper {
        display: flex;
    }

    .lecturer-item {
        min-width: 270px;
    }

    .lecturer-item:nth-child(n+2) {
        display: none;
    }
    .svg-lecturer {
        margin-left: 8px;
        margin-right: 0px;
        position: relative;
        top: 3px;
    }

    .lecturer-information {
        display: flex;
        margin-top: 6px;
        margin-bottom: 16px;
        align-items: center;
    }

    .button { 
        min-width: 25px;
        height: 25px; 
        border-radius: 50%;
        color:#548BB1;
        border: none;
        margin: 0;
        padding: 0;
    }

    .previous {
        margin-right: 15px;
    }

    .next {
        margin-left: 15px;
    }

    .material-symbols-sharp {
        line-height: 24px;
        font-size: 19px;
        position: relative;
        top: 0.5px;
    } 

    .button-left, 
    .button-right {
        left: 3px;
    }

    .lecturer-picture {
        width: 130px;
        height: 110px;
        object-fit: cover;
        border-radius: 5px;
    }
    .lecturer-picture-none {
        background-color: #548BB1;
        min-width: 130px;
        height: 110px;
        border-radius: 5px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
    } 

    .lecturer-name {
        margin-left: 17px;
        line-height: 24px;
        align-self: flex-start;
    }

    .description-none {
        color: rgba(0, 0, 0, 0.5);
        line-height: 24px;
        font-size: 14px;
    }
</style>