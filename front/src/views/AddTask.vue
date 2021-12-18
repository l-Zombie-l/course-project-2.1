<template>
<div class="add">
    <h1>Добавить задачу</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputId" class="col-xs-2 control-label">Сотрудник: </label>
            <input type="text" maxlength="20" minlength="1" class="form-control col-xs-10" id="inputId" placeholder="Введите id сотрудника" v-model="form.userId" title="Введите id существующего пользователя."> <br>

            <label for="inputName" class="col-xs-2 control-label">Название: </label>
            <input type="text" maxlength="50" minlength="6" class="form-control col-xs-10" id="inputName" placeholder="Введите название новости" v-model="form.name" title="Введите название задачи, больше шести символов."> <br>

            <label for="inputNew" class="col-xs-2 control-label">Содержимое: </label>
            <textarea type="text" minlength="6" class="form-control col-xs-10 news" id="inputNew" placeholder="Введите содержимое новости" v-model="form.info" title="Введите содержимое задачи, больше шести символов."></textarea>
        </div><br>
    </form>
    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="addTask()">Добавить задачу</button>
        </div>
    </form><br>
</div>
</template>

<style lang="scss">
.form-group {
    text-align: left;
    padding: 0px 25% 0px 25%;
}

.buttons {
    display: flex;
    padding: 0px 25% 0px 25%;
    justify-content: center;
}

.button {
    display: inline-block;
    width: 100%;
    text-align: center;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 19px;
    text-align: center;
    color: #333;
}

.news {
    height: 250px;
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
        userId: "1",
        name: "test",
        info: "test"
    }

    async addTask() {
        try {
            const result = await axios.post('http://localhost:4100/add_task', this.form)
            window.location.href = '/home/one';
            console.log(result.data);
        } catch {
            alert("Ошибка сохранения, проверьте введенные данные")
        }

    }
}
</script>
