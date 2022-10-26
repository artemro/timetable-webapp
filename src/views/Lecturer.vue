<template>
    <div class="lecturer-wrapper">
        <div v-if="!this.loaded" class="lds-dual-ring"></div>
        <div v-else>
            <div class="lecturer-photo" v-if="this.lecturerInfo.avatar_link">
                <img v-bind:src="this.lecturerInfo.avatar_link" alt="">
            </div>
            <div class="lecturer-photo" v-else>
                <div class="material-symbols-sharp">person</div>
            </div>
            <h2 class="lecturer-header"><b>{{lecturerInfo.first_name}} {{lecturerInfo.middle_name}}</b></h2>
            <h2 class="lecturer-header"><b>{{lecturerInfo.last_name}}</b></h2>
            <div class="lecturer-description">{{lecturerInfo.description}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lecturerId: this.$route.params.lecturerId,
            lecturerInfo: {},
            loaded: false,
        }
    },
    methods: {
        loadLecturerInfo() {
            var url = new URL(`${process.env.VUE_APP_API_TIMETABLE}/timetable/lecturer/${this.lecturerId}`);
            fetch(url).then(response => response.json())
                .then(json => {
                this.lecturerInfo = json;
                this.loaded = true;
            })
        },
    },
    beforeMount() {
        this.loadLecturerInfo();
        let changeHeaderLayoutEvent = new CustomEvent("change-header-layout", {
            detail: {
                layoutName: "back",
                text: "Вернуться к предмету",
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
    }
    
}
</script>

<style scoped>
.lecturer-wrapper {
    padding: 32px 24px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lecturer-photo {
    margin: 0 auto;
    border-radius: 50%;
    width: 128px;
    height: 128px;
    display: flex;
    background-color: #d9d9d9;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

}

.lecturer-header {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.material-symbols-sharp {
    font-size: 80px;
}

.lecturer-description {
    margin-top: 32px;
    line-height: 24px;
    text-align: center;
}

.lds-dual-ring {
    align-self: center;
}


</style>