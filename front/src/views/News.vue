<template>
<div class="news">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Новости</h1>
    <div class="container">
        <table class="table table-secondary table-striped">
            <thead>
                <tr>
                    <th scope="col">Автор</th>
                    <th scope="col">Название</th>
                    <th scope="col">Содержимое</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="news in news" :key="news.id">
                    <td></td>
                    <td>{{news.name}}</td>
                    <td>{{news.info}}</td>
                    <td><button class="btn btn-light" @click="openNews(id)">Редактирование</button></td>
                </tr>
            </tbody>
        </table>
    </div>
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
    news: any[] = [];

    response = "";

    async getNews() {
        const result = await axios.get('http://localhost:4100/news')
        this.news = result.data.data;
        console.log(this.news)
    }

    mounted() {
        this.getNews()
    }
    
    // async update_news() {
    //     const result = await this.$store.dispatch("update_news", this.form);
    //     console.log(result.data);
    // }
}
</script>
