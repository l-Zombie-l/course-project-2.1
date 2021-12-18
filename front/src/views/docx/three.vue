<template>
<div class="one div">
    <div class="container">
        <h2><b>ОТЧЕТ</b><br></h2>
        <h2><b>Поставленные задачи</b></h2>
        <p align="left">Запросил сотрудник: {{localFIO}}</p>
        <p align="left">Дата: {{date}}, {{time}}</p>

        <table class="table table-bordered table_word">
            <thead>
                <tr>
                    <th scope="col" width="5%"><b>№</b></th>
                    <th scope="col" width="30%"><b>Название задачи</b></th>
                    <th scope="col"><b>Содержимое</b></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tasks in tasks" :key="tasks.id">
                    <td>{{tasks.id}}</td>
                    <td>{{tasks.name}}</td>
                    <td>{{tasks.info}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</div>
</template>

<style lang="scss">
.div {
    background-color: white;
    color: #333;
    padding: 20px;
}

p {
    font-family: "PTSans";
    font-size: 14px;
}

h2 {
    font-family: "Times New Roman", Times, serif;
    font-size: 18px;
}

.table_word {
    font-family: "Times New Roman", Times, serif;
    font-size: 14px;
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
    tasks: any[] = [];
    date = new Date().toLocaleDateString();
    time = new Date().toLocaleTimeString();
    localFIO = localStorage.getItem('fio');


    async getUserSort() {
        const result = await axios.get('http://localhost:4100/tasks')
        this.tasks = result.data.data;
        console.log(this.tasks)
    }

    mounted() {
        this.getUserSort()
    }
}
</script>
