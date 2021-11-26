<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Все пользователи БД</h1>
    <button @click="getList()" class="btn btn-light">Показать всех пользователей</button><br><br>

    <div class="container">
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ФИО</th>
                    <th scope="col">Email</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.fio}}</td>
                    <td>{{user.email}}</td>
                    <td><button class="btn btn-light" @click="deleteUser()">Удалить</button></td>
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
    users: any[] = [];

    response = "";

    async getList() {
        const result = await axios.get('http://localhost:4100/users')
        this.users = result.data.data;
        console.log(this.users)
    }

    async deleteUser() {
        const result = await axios.delete('http://localhost:4100/users')
        this.users = result.data.data;
        console.log(this.users)
    }
}
</script>
