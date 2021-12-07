<template>
<div class="app">
    <div class="container">
        <table class="table table-secondary table-striped">
            <thead>
                <tr>
                    <th scope="col">Название документа</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <div class="button btn btn-light" type="button">
                            <router-link to="/home/one">Выбрать</router-link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="button btn btn-light" type="button">
                            <router-link to="/home/one">Выбрать</router-link>
                        </div>
                    </td>

                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div class="button btn btn-light" type="button">
                            <router-link to="/home/one">Выбрать</router-link>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
        <textarea>
        <router-view />
        </textarea>
    </div>
</div>
</template>

<style lang="scss">
#docx {
    overflow: hidden;
    background-color: rgba(50, 50, 50, 0.1);
    padding: 30px;
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

@Component({
    components: {},
})
export default class Home extends Vue {
    
}
</script>
