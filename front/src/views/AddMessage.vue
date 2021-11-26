<template>
<div class="add">
    <h1>Отправка сообщения</h1>   
    Email: <input v-model="form.email"><br>
    Сообщение: <input v-model="form.info"><br><br>
    <button @click="addMessage()">Отправить сообщение</button><br><br>
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
        email: "ich_liebe_dich_nicht@vk.com",
        info: "Ауф"
    }

    response = "Ожидание действий пользователя.";

    async addMessage(){
        const result = await axios.post('http://localhost:4100/messages', this.form)
        this.response = result.data
    }
}
</script>
