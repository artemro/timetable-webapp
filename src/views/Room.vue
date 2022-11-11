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
            <a href="https://cdn.profcomff.com/app/map/" class="map-link">
                <div class="map-text">Посмотреть на карте</div>
            </a>
        </div>
        <div class="frame-header">
            <h4>Неисправность в аудитории?</h4>
        </div>
        <iframe src="https://forms.yandex.ru/u/635d013b068ff0587320bfc9/?iframe=1" 
                frameborder="0" 
                name="ya-form-635d013b068ff0587320bfc9" 
                width="100%"
                class="frame">
        </iframe>
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
    mounted() {
        const insertScript = document.createElement('script');
        insertScript.setAttribute('src', 'https://yastatic.net/s3/frontend/forms/_/embed.js');
        document.body.appendChild(insertScript);
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
    margin: 16px auto;
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
}

a { 
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

.frame-header {
    align-self: flex-start;
    margin-bottom: 8px;
    margin-top: 8px;
}
</style>

<style>
@media (min-width: 768px) {
    .frame {
        max-width: 640px;
    }
}
</style>