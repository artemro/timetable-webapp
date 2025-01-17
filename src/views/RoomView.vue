<template>
    <div class="room-wrapper">
        <div
            v-if="!loaded"
            class="lds-dual-ring"
        ></div>
        <div
            v-else
            class="wrapper"
        >
            <div class="location-wrapper">
                <div
                    v-if="roomInfo.building"
                    class="room-location"
                >
                    <span class="material-symbols-sharp noselect"
                        >location_on</span
                    >
                    <span class="room-info">{{ roomInfo.building }}</span>
                </div>
                <div
                    v-if="roomInfo.direction"
                    class="room-location"
                >
                    <span class="material-symbols-sharp noselect">explore</span>
                    <span class="room-info">{{
                        roomDirection(roomInfo.direction)
                    }}</span>
                </div>
            </div>
            <h4 class="room-header"><b>Карта этажа</b></h4>
            <div class="map">
                <RouterLink
                    :to="mapLink"
                    class="map-link"
                >
                    <div class="map-text">Посмотреть на карте</div>
                </RouterLink>
            </div>
            <RouterLink
                :to="feedbackLink"
                class="frame-link"
            >
                Сообщить о неисправности
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roomId: this.$route.params.roomId,
            roomInfo: {},
            loaded: false,
        };
    },
    computed: {
        feedbackLink() {
            return `/apps/browser#${process.env.VUE_APP_FEEDBACK_FORM}?url=${window.location.href}`;
        },
        mapLink() {
            return `/apps/browser#${process.env.VUE_APP_CDN}/app/map/`;
        },
    },
    watch: {
        roomInfo(elem) {
            let changeHeaderLayoutEvent = new CustomEvent(
                'change-header-layout',
                {
                    detail: {
                        layoutName: 'back',
                        text: elem.name,
                    },
                },
            );
            document.dispatchEvent(changeHeaderLayoutEvent);
        },
    },
    mounted() {
        this.loadRoomInfo();
        let changeHeaderLayoutEvent = new CustomEvent('change-header-layout', {
            detail: {
                layoutName: 'back',
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
    },
    methods: {
        loadRoomInfo() {
            var url = new URL(
                `${process.env.VUE_APP_API_TIMETABLE}/timetable/room/${this.roomId}`,
            );
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.roomInfo = json;
                    this.loaded = true;
                });
        },
        roomDirection(direction) {
            if (direction === 'North') return 'Север (от входа налево)';
            if (direction === 'South') return 'Юг (от входа направо)';
        },
    },
};
</script>

<style scoped>
.room-wrapper {
    padding: 10px 24px;
    display: flex;
    min-height: calc(100vh - 56px * 2);
    align-items: center;
    justify-content: center;
    max-width: 640px;
    margin: 0 auto;
}

.wrapper {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.room-header {
    align-self: flex-start;
}

.location-wrapper {
    margin-bottom: 16px;
    align-self: flex-start;
}

.room-location {
    align-self: flex-start;
    display: flex;
    height: 30px;
    margin-bottom: 8px;
    width: 100%;
    align-items: center;
}

.room-info {
    padding-left: 12px;
}

.map {
    margin: 16px auto 32px;
    width: 300px;
    height: 150px;
    background-image: url('../assets/map.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
}

.map::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 150px;
    background-color: #00004b;
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
    background-color: white;
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
