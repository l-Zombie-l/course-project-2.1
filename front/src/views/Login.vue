<template>
<div class="login">
    <h1>Авторизация</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
            <input type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" v-model="form.email"><br>

            <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
            <input type="password" class="form-control col-xs-10" id="inputPassword" placeholder="Введите пароль" v-model="form.password">
        </div><br>
    </form>

    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="login()">Вход</button>
            <a href="/register" class="button btn btn-light"><button type="button" class="register">Регистрация</button></a>
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

.register {
    border: 0ch;
    background-color: rgba(0, 0, 0, 0);
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
export default class Login extends Vue {
    form = {
        fio: "",
        email: "ich_liebe_dich_nicht@vk.com",
        password: "987456321"
    }
    user = [];
    fio="";
    email="";
    password="";

    response = "";

    async login() {
        const result = await this.$store.dispatch("login", this.form);
        this.fio = result.fio;
        this.email = result.email;
        this.password = result.password;
        this.response = JSON.stringify(this.fio);
    }
    async register() {
        const result = await axios.post('http://localhost:4100/login', this.form);
        this.response = JSON.stringify(result.data);
    }
}
</script>
