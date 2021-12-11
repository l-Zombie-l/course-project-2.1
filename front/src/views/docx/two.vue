<template>
<div class="one div">
    <div class="container">
        <h1>///</h1>
        <table class="table table-secondary table-striped">
            <thead>
                <tr>
                    <th scope="col">Автор</th>
                    <th scope="col">Название</th>
                    <th scope="col">Содержимое</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="news in news" :key="news.id">
                    <td></td>
                    <td>{{news.name}}</td>
                    <td>{{news.info}}</td>
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

    async getNews() {
        const result = await axios.get('http://localhost:4100/news')
        this.news = result.data.data;
        console.log(this.news)
    }
    
    mounted() {
        this.getNews()
    }
}
</script>
