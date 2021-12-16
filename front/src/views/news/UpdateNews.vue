<template>
<div class="add">
    <h1>Изменить новость</h1>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputName" class="col-xs-2 control-label">Название: </label>
            <input type="text" maxlength="50" minlength="6" class="form-control col-xs-10" id="inputName" placeholder="Введите название новости"  v-model="this.name" title="Введите название новости, больше шести символов."> <br>

            <label for="inputNew" class="col-xs-2 control-label">Содержимое: </label>
            <textarea type="text" minlength="6" class="form-control col-xs-10 news" id="inputNew" placeholder="Введите содержимое новости" v-model="form.info" title="Введите содержимое новости, больше шести символов."></textarea>
        </div><br>
    </form>
    <form class="form-horizontal" @submit.prevent="">
        <div class="buttons">
            <button type="button" class="button btn btn-light" @click="save()">Изменить статью</button>
        </div>
    </form><br>
    {{response}}
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
    height: 150px;
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

    }
    name = "";
    response = "Ожидание действий пользователя.";

    async save() {
         try{
   const result = await this.$store.dispatch("updateNews", this.form);
        this.name = JSON.stringify(result.data.name);

        console.log(result);
        }
        catch{
            alert("Ошибка сохранения, проверьте введенные данные.")
        }
     
    }
}
</script>
