<template>
<div class="login">
    <h1>Авторизация</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
            <input type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" v-model="form.email"><br>

            <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
            <input type="text" class="form-control col-xs-10" id="inputPassword" placeholder="Введите пароль" v-model="form.password">
        </div><br>
    </form>

    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="login()">Вход</button>
            <p class="sympol">|</p>
            <a href="/register" class="button btn btn-light"><button type="button" class="register">Регистрация</button></a>
        </div>
    </form><br>
    <!-- {{response}} -->
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

.register {
    border: 0ch;
    background-color: rgba(0, 0, 0, 0);
}

.sympol {
    color: rgba(255, 255, 255, 0);
    ;
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
        email: "ich_liebe_dich_nicht@vk.com",
        password: "987456321"
    }
    token = "";
    user = [];

    async login() {
        const result = await this.$store.dispatch("login", this.form);
        this.token = result.token;

        localStorage.setItem('fio', result.user.fio);
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('password', this.form.password);

        console.log(result);
        window.location.href = '/home';
    }
}
</script>
