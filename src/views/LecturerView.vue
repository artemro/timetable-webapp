<template>
    <div class="lecturer-wrapper">
        <div
            v-if="!loaded"
            class="lds-dual-ring"
        ></div>
        <div
            v-else
            class="wrapper"
        >
            <div
                v-if="lecturerInfo.avatar_link"
                class="lecturer-photo"
            >
                <img
                    :src="`${lecturerImg}/${lecturerInfo.avatar_link}`"
                    alt=""
                    class="lecturer-img"
                />
            </div>
            <div
                v-else
                class="lecturer-photo"
            >
                <div class="material-symbols-sharp">person</div>
            </div>
            <div v-if="lecturerInfo.first_name[2]">
                <h2 class="lecturer-header">
                    <b
                        >{{ lecturerInfo.first_name }}
                        {{ lecturerInfo.middle_name }}</b
                    >
                </h2>
                <h2 class="lecturer-header">
                    <b>{{ lecturerInfo.last_name }}</b>
                </h2>
            </div>
            <div v-else>
                <h2 class="lecturer-header">
                    <b
                        >{{ lecturerInfo.first_name }}
                        {{ lecturerInfo.middle_name }}
                        {{ lecturerInfo.last_name }}</b
                    >
                </h2>
            </div>
            <div class="lecturer-description">
                {{ lecturerInfo.description }}
            </div>
            <div class="frame-wrapper">
                <RouterLink
                    :to="feedbackLink"
                    class="frame-link"
                    >Написать жалобу</RouterLink
                >
            </div>
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
        };
    },
    computed: {
        lecturerImg() {
            return `${process.env.VUE_APP_API_TIMETABLE}`;
        },
        feedbackLink() {
            return `/apps/browser#${process.env.VUE_APP_FEEDBACK_FORM}?url=${window.location.href}`;
        },
    },
    watch: {
        lecturerInfo(elem) {
            let changeHeaderLayoutEvent = new CustomEvent(
                'change-header-layout',
                {
                    detail: {
                        layoutName: 'back',
                        text: `${elem.last_name} ${elem.first_name[0]}. ${elem.middle_name[0]}.`,
                    },
                },
            );
            document.dispatchEvent(changeHeaderLayoutEvent);
        },
    },
    beforeMount() {
        this.loadLecturerInfo();
        let changeHeaderLayoutEvent = new CustomEvent('change-header-layout', {
            detail: {
                layoutName: 'back',
            },
        });
        document.dispatchEvent(changeHeaderLayoutEvent);
    },
    methods: {
        loadLecturerInfo() {
            var url = new URL(
                `${process.env.VUE_APP_API_TIMETABLE}/timetable/lecturer/${this.lecturerId}`,
            );
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.lecturerInfo = json;
                    this.loaded = true;
                });
        },
    },
};
</script>

<style scoped>
.lecturer-wrapper {
    padding: 10px 24px;
    display: flex;
    min-height: calc(100vh - 56px * 2);
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.wrapper {
    align-self: flex-start;
    width: 100%;
    max-width: 640px;
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

.lecturer-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
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
    margin: 32px auto;
    line-height: 24px;
    text-align: center;
}

.lds-dual-ring {
    align-self: center;
}

.frame-wrapper {
    display: flex;
    justify-content: center;
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

@media (min-width: 768px) {
    .wrapper {
        width: 80%;
    }
}
</style>
