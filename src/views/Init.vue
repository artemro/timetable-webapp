<template>
  <div class="init-background" :style="{backgroundImage: `url('${bgItem}')`}">
    <div class="container">
      <div class="init">
        <img :src= "logoItem" :style="{backgroundColor: '#fff' }"/>
        <h1>Добро пожаловать!</h1>
        <p>
          Наше приложение позволит получить доступ к сервисам для студентов ФФ
          МГУ!
        </p>
        <p>Для просмотра расписания выберите свою группу</p>
        <select
          class="form-select form-select-sm mb-3 group-selector"
          v-model="groupId"
        >
          <option selected value=-1>Не выбрано</option>
          <option
            v-for="group in groupList.items"
            :key="group.id"
            :value="group.id"
          >
            {{ group.number }}
          </option>
        </select>
        <button
          type="button"
          class="btn btn-primary btn-lg save-button"
          @click="saveGroup"
        >
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
      console.log("groupId:", this.groupId);
      if (this.groupId && this.groupId != "-1") {
        localStorage.setItem("timetable-group-id", this.groupId);
          this.$router.push({name: 'timetable'});
      } else {
        alert("Пожалуйста, выберите номер группы!");
      }
    },
    loadGroups() {
      var url = new URL(
       `${process.env.VUE_APP_API_TIMETABLE}/timetable/group/`
      ),  params = {limit: 0, offset: 0}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          json.items.sort(function (a, b) {
            if (a.number.length > b.number.length) {
              return 1;
            }
            if (a.number.length < b.number.length) {
              return -1;
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
    document.dispatchEvent(
      new CustomEvent("change-header-layout", {
        detail: {
          layoutName: "calendar",
          text: "Твой физфак!",
          disabled: true,
          menu: [],
        },
      })
    );
  },
  computed:{
    logoItem(){
      return `${process.env.VUE_APP_CDN}/app/logo/logo_ff.svg`;
    },
    bgItem(){
        return `${process.env.VUE_APP_CDN}/app/background.png`;
    }
  },
  data() {
    return {
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
  /* background-image: url(v-bind(bgItem)); */
  background-repeat: repeat;
  background-size: cover;
  background-clip: padding-box;
}
.init {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
  padding-bottom: 66px;
  gap: 1em;
  width: 100%;
  height: 100%;
}
.container{
  height: 100%;
}
h1 {
  font-weight: bold;
}
p {
  text-align: justify;
}
.group-selector:hover {
  opacity: 0.6;
  box-shadow: none;
}
.group-selector:focus, :active {
  box-shadow: none;
  border-width: 1px;
  border-color: #ced4da;
}
.save-button {
  background-color: var(--bs-primary);
  border: none;
}
.save-button:hover
 {
  opacity: 0.6;
}
.save-button:focus, :active{
  box-shadow: none;
}
img {
  width: 40%;
  height: auto;
  max-width: 200px;
  border-radius: 50%;
}
</style>
