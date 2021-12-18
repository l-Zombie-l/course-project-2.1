<template>
<div>
    <div class="one div">
        <div id="container"><br>
            <h2><b>ОТЧЕТ</b><br></h2>
            <p><b>о работе сотрудника</b></p>
            <p align="left">Сотрудник: {{localFIO}}</p>
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
</div>
</template>

<style lang="scss">
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

.div {
    background-color: white;
    color: #333;
    padding: 20px;
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
@Component({})

export default class Home extends Vue {
    tasks: any[] = [];
    token = "";
    date = new Date().toLocaleDateString();
    time = new Date().toLocaleTimeString();
    localFIO = localStorage.getItem('fio');

    async getTasks() {
        const result = await instance.get('http://localhost:4100/user/tasks');
        this.tasks = result.data;
        console.log(this.tasks)
    }

    mounted() {
        this.getTasks()
    }
}
</script>
