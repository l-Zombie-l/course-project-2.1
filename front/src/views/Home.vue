<template>
<div class="app">
    <div class="container">
        <h4>Система формирования отчетной документации на базе шаблонных форм</h4>
        <div v-if="!token">
            <table class="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th scope="col">Название документа</th>
                        <th scope="col">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Отчет о проделанной работе сотрудника</td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
             <table class="table table-secondary table-striped">
                <thead>
                    <tr>
                        <th scope="col">Название документа</th>
                        <th scope="col">Действие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Отчет о проделанной работе сотрудника</td>
                        <td>
                            <router-link class="router-link button btn btn-light" type="button" to="/home/one">Выбрать</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <router-link class="router-link button btn btn-light" type="button" to="/home/two">Выбрать</router-link>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <router-link class="router-link button btn btn-light" type="button" to="/home/one">Выбрать</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <router-view />
    </div>
</div>
</template>

<style lang="scss">
.router-link {
    text-decoration: none;
    color: #333;
}

.button {
    display: inline-block;
    width: 75%;
    margin: 0px 5px 0px 5px;
    text-align: center;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 19px;
    text-align: center;
    color: #333;
}

h4 {
    padding: 5px;
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
    token = "";
    mounted() {
        this.token = localStorage.token;
    }
}
</script>
