<template>
<div id="app">
    <div id="nav">
        <ul>
            <li><a href="/home" class="text">Главная</a></li>
            <li><a href="/register" class="text">Регистрация</a></li>
            <li><a href="/news" class="text">Новости</a></li>
            <li style="float:right" ><a href="/profile" class="text">Профиль</a></li>
        </ul>
    </div>
<div  id="page">
    <router-view/>
</div>
</div>
</template>

<style lang="scss">
body{    
    background-image: url("C:/Users/Zombie/Documents/Курсовая 26112021/bunina_2611/front/images/fon1.jpg");
    background-size: 100%;
    background-attachment: fixed; 
    background-color: rgb(0, 0, 0);
}
a.text:hover{
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
    padding: 15px;
    margin: 30px; 
}
</style>
