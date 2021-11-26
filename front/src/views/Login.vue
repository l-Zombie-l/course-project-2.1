<template>
<div class="login">
    <h1>Авторизация</h1>
    <!-- <p>Email: <input v-model="form.email"></p>
    <p>Пароль: <input v-model="form.password"></p> -->

    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputEmail" class="col-xs-2 control-label">Адрес email: </label>
            <!-- <div class="col-xs-10"> -->
                <input type="email" class="form-control col-xs-10" id="inputEmail" placeholder="Введите email">
            <!-- </div> -->
        </div><br>
        <div class="form-group">
            <label for="inputPassword" class="col-xs-2 control-label">Пароль: </label>
            <div class="col-xs-10">
                <input type="password" class="form-control" id="inputPassword" placeholder="Введите пароль">
            </div><br>
        </div>
    </form>

    <div class="buttons">
        <button class="button btn btn-light " @click="login()">Вход</button>
        <button class="button btn btn-light " @click="login()">Регистрация</button>
    </div><br>
    {{response}}
</div>
</template>

<style lang="scss">
.form-group {
padding: 0px 300px 0px 300px;
}

.buttons {
    display: flex;
    padding: 0px 300px 0px 300px;
    // justify-content: center;
}

.button {
    font-family: inherit;
    display: inline-block;
    width: 250px;
    margin: 0 auto;
    text-align: center;
}
</style>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";

import axios from "axios"

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

    async login() {
        const result = await axios.post('http://localhost:4100/login', this.form);
        this.response = JSON.stringify(result.data);
    }
}
</script>
