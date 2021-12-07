<template>
<div class="news">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Новости</h1>
    <button @click="getList()" class="btn btn-light">Все новости</button><br><br>

    <div class="container">
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Название</th>
                    <th scope="col">Содержимое</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="news in news" :key="news.id">
                    <td>{{news.id}}</td>
                    <td>{{news.name}}</td>
                    <td>{{news.info}}</td>
                    <td><button class="btn btn-light" @click="deleteUser()">Редактирование</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

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
    news: any[] = [];

    response = "";

    async getList() {
        const result = await axios.get('http://localhost:4100/news')
        this.news = result.data.data;
        console.log(this.news)
    }

    async deleteUser() {
        const result = await axios.delete('http://localhost:4100/users')
        this.news = result.data.data;
        console.log(this.news)
    }
}


</script>
