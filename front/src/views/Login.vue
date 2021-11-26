<template>
<div class="login">
    <h1>Добавление нового пользователя</h1>
    ФИО: <input v-model="form.fio"><br>
    Email: <input v-model="form.email"><br>
    Пароль: <input v-model="form.password"><br><br>
    <button @click="login()">Зарегистрироваться</button><br><br>
    {{response}}
</div>
</template>

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

    async login(){
        const result = await axios.post('http://localhost:4100/login', this.form);
        this.response = JSON.stringify(result.data);
    }  
}
</script>
