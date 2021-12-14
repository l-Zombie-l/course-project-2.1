<template>
<div class="add">
    <h1>Добавить новость</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputName" class="col-xs-2 control-label">Название: </label>
            <input type="text" class="form-control col-xs-10" id="inputName" placeholder="Введите название новости" v-model="form.name"  title="Всплывающая подсказка"> <br>

            <label for="inputNew" class="col-xs-2 control-label">Содержимое: </label>
            <textarea type="text" class="form-control col-xs-10 news" id="inputNew" placeholder="Введите содержимое новости" v-model="form.info"></textarea>
        </div><br>
    </form>
    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="addNews()">Добавить новость</button>
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


@Component({
    components: {},
})
export default class Home extends Vue {  
    form = {
        name: "",
        info: ""
    }
    
    async addNews() {
        try{
            const result = await this.$store.dispatch("addNews", this.form);
            window.location.href = '/news';
        }
        catch{
            alert("Ошибка!")
        }
    }   
}
</script>
