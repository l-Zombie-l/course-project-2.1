<template>
<div id="app">
    <div id="nav">
        <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/about">Регистрация</a></li>
            <li><a href="/add">Сообщения</a></li>
            <li style="float:right"><a href="/login" >Авторизация</a></li>
        </ul>

    </div>
    <router-view />
</div>
</template>

<style lang="scss">
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
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
    text-align: center;
    color: #2c3e50;

     height: 100%;
    box-sizing: border-box;
    margin: 0;
    background-image: url("C:/Users/Zombie/Documents/Курсовая 26112021/bunina_2611/front/images/back.jpg");
    background-size: 100%;
}

#nav {
    padding: 30px;
    background-repeat: repeat-x;
}
</style>
