<template>
<div class="edit">
    <h1>Изменить новость</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputName" class="col-xs-2 control-label">Название: </label>
            <input type="text" minlength="6" class="form-control col-xs-10" id="inputName" placeholder="Введите название новости" v-model="form.name" title="Введите не менее шести символов."> <br>

            <label for="inputNew" class="col-xs-2 control-label">Содержимое: </label>
            <textarea type="text" class="form-control col-xs-10 news" id="inputNew" placeholder="Введите содержимое новости" v-model="form.info"></textarea>
        </div><br>
    </form>
    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="updateNews()">Изменить новость</button>
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
    height: 300px;
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

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_HOST,
});
instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

@Component({
    components: {},
})
export default class Home extends Vue {
    localName = localStorage.getItem('name');
    localInfo = localStorage.getItem('info');
    localId = localStorage.getItem('idNews');

    form = {
        name: this.localName,
        info: this.localInfo
    }

    async updateNews() {

        try {
            const result = await instance.put('http://localhost:4100/user/update_news/' + this.localId, this.form);
            window.location.href = '/news';
        } catch {
            alert("Ошибка сохранения, проверьте введенные данные.")
        }

    }

    created() {
        localStorage.setItem('idNews', "");
        localStorage.setItem('name', "");
        localStorage.setItem('info', "");
    }

}
</script>
