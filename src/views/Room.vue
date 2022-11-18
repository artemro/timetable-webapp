<template>
    <div class="room-wrapper">
        <div v-if="roomInfo.building">
            <span class="material-symbols-sharp">location_on</span>
            <span>{{roomInfo.building}}</span>
        </div>
        <div v-if="roomInfo.direction">
            <span class="material-symbols-sharp">explore</span>
            <span>{{roomInfo.direction}}</span>
        </div>
        <h4 class="room-header"><b>Карта этажа</b></h4>
        <div class="map">
            <a v-bind:href="mapLink" class="map-link">
                <div class="map-text">Посмотреть на карте</div>
            </a>
        </div>
        <a v-bind:href="feedbackLink" class="frame-link">Сообщить о неисправности</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roomId: this.$route.params.roomId,
            roomInfo: {},
        }
    },
    methods: {
        loadRoomInfo() {
            var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/room/${this.roomId}`);
            fetch(url).then(response => response.json())
                .then(json => {
                this.roomInfo = json;
            })
        },
    },
    beforeMount() {
        this.loadRoomInfo();
        let changeHeaderLayoutEvent = new CustomEvent("change-header-layout", {
            detail: {
                layoutName: "back",
                text: "Вернуться к предмету",
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
    },
    computed: {
        feedbackLink() {
            return `${process.env.VUE_APP_CDN}`;
        }, 
        mapLink() {
            return `${process.env.VUE_APP_CDN}/app/map`;
        }
    }
}
</script>


<style scoped>
.room-wrapper {
    padding: 32px 24px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 640px;
    margin: 0 auto;
}

.room-header {
    align-self: flex-start;
}

.map {
    margin: 16px auto 32px;
    width: 300px;
    height: 150px;
    background-image: url("../assets/map.png"); 
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
}

.map::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 150px;
    background-color: #00004B;
    opacity: 0.6;
    border-radius: 20px;
    z-index: 1;
}

.map-link {
    position: relative;
    z-index: 3;
    display: inline-block;
    width: 300px;
    height: 150px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    text-decoration: none;
    color: white;
}

.map-text {
    margin: auto;
    width: 150px;
    line-height: 26px;
    height: 52px;
    position: relative;
    top: calc(50% - 26px);
    text-align: center;
}
.frame-link {
    display: inline-block;
    margin: 0 auto 88px;
    background-color:  white;
    text-decoration: none;
    color: rgba(0, 0, 75, 0.8);
    padding: 8px 16px;
    border-radius: 16px;
    max-width: 330px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    border: 3px solid var(--bs-primary-80);
} 
</style>
