<template>
    <div class="one div">
       <h1>Отчет о проделанной работе за 2021 год</h1>
    </div>
</template>

<style lang="scss">
.div{
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

}
</script>