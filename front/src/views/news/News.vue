<template>
<div class="news">
    <h1>Новости</h1>
    <div class="container">
        <div v-if="!token">
            <table class="table table-secondary table-striped" title="Нажмите чтобы открыть новость.">
                <thead>
                    <tr>
                        <th scope="col" width="20%">Название</th>
                        <th scope="col">Содержимое</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="news in news" :key="news.id">
                        <td @click="openNews(news.id)">{{news.name}}</td>
                        <td class='td_info' @click="openNews(news.id)">
                            <p class="cuttedText">{{news.info}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <a href="/add_news" class="button btn btn-light" type="button">Добавить новость</a><br><br>

            <table class="table table-secondary table-striped" title="Нажмите чтобы открыть новость.">
                <thead>
                    <tr>
                        <th scope="col" width="20%">Название</th>
                        <th scope="col">Содержимое</th>
                        <th scope="col" width="20%">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="news in news" :key="news.id">
                        <td @click="openNews(news.id)">{{news.name}}</td>
                        <td class='td_info' @click="openNews(news.id)">
                            <p class="cuttedText">{{news.info}}</p>
                        </td>
                        <td v-if="localIdUser == news.userId"><button class="btn btn-light button" @click="editNews(news.id)">Редактирование</button></td>
                        <td v-else></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.form-group {
    text-align: left;
    padding: 0px 25% 0px 25%;
}
table {
    table-layout: fixed;
    width: 100%
}
td {
    word-wrap: break-word;
}
.td_info {
    text-align: left;
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
.cuttedText {
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    localIdUser = localStorage.getItem('id');

    token = "";
    response = "";

    async getNews() {
        const result = await axios.get('http://localhost:4100/news');
        this.news = result.data.data;
        console.log(this.news);
    }

    async editNews(id: any) {
        const result = await this.$store.dispatch("openNews", id);
        localStorage.setItem('idNews', result.id);
        localStorage.setItem('name', result.name);
        localStorage.setItem('info', result.info);
        window.location.href = '/edit_news';

        console.log(result);
    }

    async openNews(id: any) {
        const result = await this.$store.dispatch("openNews", id);
        localStorage.setItem('idNews', result.id);
        localStorage.setItem('name', result.name);
        localStorage.setItem('info', result.info);
        window.location.href = '/open_news';

        console.log(result);
    }

    mounted() {
        this.getNews();
        this.token = localStorage.token;
    }

}
</script>
