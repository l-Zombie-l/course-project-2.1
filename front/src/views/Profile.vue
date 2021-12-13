<template>
<div class="container">
    <div class="profile">
        <h2>Профиль</h2>
        <form class="form-horizontal" method="GET" id="ajax_form" action="">
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
                <p class="sympol">|</p>
                <button type="button" class="button btn btn-light" @click="destroy()">Удалить аккаунт</button>
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
    token = "";
    localFIO = localStorage.getItem('fio');
    localEmail = localStorage.getItem('email');
    localPass = localStorage.getItem('password');

    user = [];
    response = "";

    form = {
        fio: this.localFIO,
        email: this.localEmail,
        password: this.localPass,
    }

    async save() {
        const result = await this.$store.dispatch("update", this.form);
        localStorage.setItem('fio', result.user.fio);
        localStorage.setItem('password', result.user.password);
        console.log(result);
    }

    async destroy() {
        const result = await this.$store.dispatch("me");
        alert(`Вы удалили свой аккаунт ${result.fio}.`);
        const destroy = await this.$store.dispatch("destroy", result.id);
        localStorage.setItem('token', "");
        localStorage.setItem('fio', "");
        localStorage.setItem('email', "");
        localStorage.setItem('password', "");
        window.location.href = '/login';
        console.log(destroy);
    }

    async logout() {
        const result = await this.$store.dispatch("logout");
        this.token = "";
        localStorage.setItem('fio', "");
        localStorage.setItem('email', "");
        localStorage.setItem('password', "");
        window.location.href = '/login';
        console.log(result);
    }

    mounted() {
        this.token = localStorage.token;
    }
}
</script>
