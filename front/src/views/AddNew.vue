<template>
<div class="add">
    <h1>Добавить новость</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
            <input type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" v-model="form.email"><br>

            <label for="inputName" class="col-xs-2 control-label">Название: </label>
            <input type="text" class="form-control col-xs-10" id="inputName" placeholder="Введите название статьи" v-model="form.name"> <br>

            <label for="inputNew" class="col-xs-2 control-label">Содержимое: </label>
            <textarea type="text" class="form-control col-xs-10 news" id="inputNew" placeholder="Введите содержимое статьи" v-model="form.info"></textarea>
        </div><br>
    </form>
    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="addNew()">Добавить статью</button>
        </div>
    </form><br>
    {{response}}
</div>
</template>

<style lang="scss">
.form-group {
    text-align: left;
    padding: 0px 300px 0px 300px;
}

.buttons {
    display: flex;
    padding: 0px 295px 0px 295px;
    justify-content: center;
}

.button {
    display: inline-block;
    width: 100%;
    margin: 0px 5px 0px 5px;
    text-align: center;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 19px;
    text-align: center;
    color: #333;
}
.news{
    height: 150px;
}
</style>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";

import axios from "axios"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 

@Component({
    components: {},
})
export default class Home extends Vue {
    form = {
        email: "ich_liebe_dich_nicht@vk.com",
        name: "Волк",
        info: "Ауф"
    }

    response = "Ожидание действий пользователя.";

    async addNew() {
        const result = await axios.post('http://localhost:4100/add_news', this.form)
        this.response = result.data
    }
}
</script>
