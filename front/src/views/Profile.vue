<template>
<div class="container">
    <div v-if="!token">
        <h2>Авторизация</h2>
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
                <p class="sympol">|⁣</p>
                <a href="/register" class="button btn btn-light"><button type="button" class="register">Регистрация</button></a>
            </div>
        </form><br>
    </div>
    <div v-else class="profile">
        <h2>Профиль</h2>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="inputText" class="col-xs-2 control-label text-start">ФИО: </label>
                <input type="text" class="form-control col-xs-10" id="inputText" placeholder="Введите ФИО" v-model="form.fio"><br>

                <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
                <input readonly type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" v-model="form.email"><br>

                <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
                <input type="text" class="form-control col-xs-10" id="inputPassword" placeholder="Введите пароль" v-model="form.password">
            </div><br>
        </form>
        <form class="form-horizontal" @submit.prevent="">
            <div class="buttons">
                <button type="button" class="button btn btn-light" @click="logout()">Выход</button>
            </div>
        </form><br>
        <form class="form-horizontal" @submit.prevent="">
            <div class="buttons">
                <button type="button" class="button btn btn-light" @click="save()">Сохранить изменение</button>
                <p class="sympol">|⁣</p>
                <button type="button" class="button btn btn-light" @click="deleteUser(user.id)">Удалить аккаунт</button>
            </div>
        </form><br>
    </div>
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

@Component({})

export default class Profile extends Vue {
    form = {
        fio: "???",
        email: "ich_liebe_dich_nicht@vk.com",
        password: "987456321",
    }
    token = "";
    // fio = this.form.fio;
    // email = this.form.email;

    user = [];

    response = "";

    async login() {
        const result = await this.$store.dispatch("login", this.form);
        this.token = result.token;
        // this.fio = result.user.fio;
        // this.email = result.user.email;
        console.log(result);
        
    }

    async save() {
        const result = await this.$store.dispatch("update", this.form);
        console.log(result);
    }

    async userDelete(id: any) {
        alert(`Удаление пользователя id:${id}`);
    }

    async logout() {
        const result = await this.$store.dispatch("logout");
        this.token = "";
    }

    mounted() {
        this.token = localStorage.token;
    }
}
</script>
