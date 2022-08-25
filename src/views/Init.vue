<template>
  <div class="init-background">
    <div class="container">
      <div class="init">
        <img src="https://cdn.profcomff.com/app/logo/icon_512x512.png" />
        <h1>Добро пожаловать!</h1>
        <p>
          Наше приложение позволит получить доступ к сервисам для студентов ФФ
          МГУ!
        </p>
        <p>Для просмотра расписания выберите свою группу</p>
        <select class="form-select form-select-sm mb-3" v-model="groupId">
          <option selected>Не выбрано</option>
          <option
            v-for="group in groupList.items"
            :key="group.id"
            :value="group.id"
          >
            {{ group.number }}
          </option>
        </select>
        <button type="button" class="btn btn-primary btn-lg save-button" @click="saveGroup">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    saveGroup() {
      if (this.groupId) {
        localStorage.setItem("timetable-group-id", this.groupId),
          this.$router.push("/timetable");
      } else {
        alert("Пожалуйста, выберите номер группы!");
      }
    },
    loadGroups() {
      var url = new URL(
        "https://timetable.api.test.profcomff.com/timetable/group/"
      );
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          json.items.sort(function (a, b) {
            if (a.number.length > b.number.length) {
              return 1;
            }
            if (a.number > b.number) {
              return 1;
            }
            if (a.number < b.number) {
              return -1;
            }
            return 0;
          });
          this.groupList = json;
        });
    },
  },
  beforeMount() {
    this.loadGroups();
    this.$store.commit("changePage", this.pageId);
  },
  data() {
    return {
      pageId: 0,
      groupId: null,
      groupList: {},
    };
  },
};
</script>

<style scoped>
.init-background {
  width: 100%;
  height: 100vh;
  padding-top: 66px;
  padding-bottom: 66px;
  background-image: url("https://cdn.profcomff.com/app/background.png");
  background-repeat: repeat;
  background-size: cover;
  background-clip: padding-box;
}
.init {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  gap: 1em;
  width: 100%;
}
h1 {
  font-weight: bold;
}
p {
  text-align: justify;
}
.save-button{
    background-color: var(--bs-primary);
    border: none;
}
img {
  width: 40%;
  height: auto;
  max-width: 300px;
}
</style>