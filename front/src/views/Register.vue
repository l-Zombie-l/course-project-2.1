<template>
<div class="register">
    <h1>Регистрация</h1>
    <!-- ФИО: <input v-model="form.fio"><br>
    Email: <input v-model="form.email"><br>
    Пароль: <input v-model="form.password"><br><br> -->
    <!-- <button @click="register()">Зарегистрироваться</button><br><br> -->

    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputText" class="col-xs-2 control-label text-start">ФИО: </label>
            <input type="text" class="form-control col-xs-10" id="inputText" placeholder="Введите ФИО" v-model="form.fio"><br>

            <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
            <input type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" v-model="form.email"><br>

            <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
            <input type="password" class="form-control col-xs-10" id="inputPassword" placeholder="Введите пароль" v-model="form.password">
        </div><br>
    </form>

    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="register()">Регистрация</button>
        </div>
    </form><br>
    {{response}}
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
        fio: "Бунина Алёна Владимировна",
        email: "ich_liebe_dich_nicht@vk.com",
        password: "987456321"
    }

    response = "Ожидание действий пользователя.";

    async register() {
        const result = await axios.post('http://localhost:4100/register', this.form);
        //    const result1 = await axios.post(`${process.env.VUE_APP_SERVER_HOST}/users`, this.form);
        this.response = JSON.stringify(result);
    }

}
</script>
