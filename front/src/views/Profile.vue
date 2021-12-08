<template>
<div class="profile">
    <div v-if="!token">
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
    </div>
    <div v-else class="profile">
        <h1>Профиль</h1>
        <form class="form-horizontal">
            <div class="form-group" v-for="user in users" :key="user.id">
                <label for="inputText" class="col-xs-2 control-label text-start">ФИО: </label>
                <input type="text" class="form-control col-xs-10" id="inputText" placeholder="Введите ФИО" {{user.fio}}><br>

                <label for="inputEmail" class="col-xs-2 control-label text-start">Адрес email: </label>
                <input readonly type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email" {{user.email}}><br>

                <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
                <input type="password" class="form-control col-xs-10" id="inputPassword" placeholder="Введите пароль" {{user.password}}>
            </div><br>
        </form>

        <form class="form-horizontal" @submit.prevent="">
            <div class="buttons">
                <button type="button" class="button btn btn-light" @click="logout()">Выход</button>
                <button type="button" class="button btn btn-light" @click="save()">Сохранить изменение</button>
                <button type="button" class="button btn btn-light" @click="deleteUser()">Удалить аккаунт</button>
            </div>
        </form><br>
    </div>
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

@Component({})

export default class Profile extends Vue {
    form = {
        fio: "Бунина Алёна Владимировна",
        email: "ich_liebe_dich_nicht@vk.com",
        password: "987456321"
    }
    token = "";
    user = [];

      async login() {
        const result = await this.$store.dispatch("login", this.form);
        this.token = result.token;
    }

    async save() {
        const result = await axios.put('http://localhost:4100/user/update', this.form);
        //    const result1 = await axios.post(`${process.env.VUE_APP_SERVER_HOST}/users`, this.form);
    }

    async deleteUser() {
        const result = await axios.delete('http://localhost:4100/user/delete/:id');
    }

    mounted() {
        this.token = localStorage.token;
    }

}
</script>
