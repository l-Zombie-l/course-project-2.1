<template>
<div id="app">
    <div v-if="!token">
        <div id="nav">
            <ul>
                <li><a href="/home" class="text">Главная</a></li>
                <li><a href="/news" class="text">Новости</a></li>
                <li style="float:right"><a href="/login" class="text">Авторизация</a></li>
            </ul>
        </div>
    </div>
    <div v-else>
        <div id="nav">
            <ul>
                <li><a href="/home" class="text">Главная</a></li>
                <li><a href="/news" class="text">Новости</a></li>
                <li><a href="/add_task" class="text">Добавить задачу</a></li>
                <li style="float:right"><a href="/profile" class="text">Профиль</a></li>
            </ul>
        </div>
    </div>
    <div id="page">
        <router-view />
    </div>
</div>
</template>

<style lang="scss">
body {
    background-image: url("C:/Users/Zombie/Documents/Курсовая 26112021/bunina_2611/front/images/fon1.jpg");
    background-size: 100%;
    background-attachment: fixed;
    background-color: rgb(0, 0, 0);
}

a.text:hover {
    text-decoration: none;
    color: rgb(177, 3, 3);
}

ul {
    list-style-type: none;
    overflow: hidden;
    background-color: rgba(50, 50, 50, 0.9);
}

li {
    float: left;
    border-right: 1px solid #bbb;
}

li:last-child {
    border-right: none;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #111;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 19px;
    text-align: center;
    color: #ffffff;
}

#nav {
    padding: 30px 30px 0 30px;
    background-repeat: repeat-x;
    opacity: 0.9;
}

#page {
    overflow: hidden;
    background-color: rgba(50, 50, 50, 0.9);
    // backdrop-filter: blur(5px);
    padding: 1%;
    margin: 30px;
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

@Component({})

export default class Profile extends Vue {
    token = "";
    mounted() {
        this.token = localStorage.token;
    }
}
</script>
