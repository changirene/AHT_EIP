<template>
  <nav>
    <h1><img :src="require('@/assets/images/company.png')" alt="AHT"></h1>
  </nav>
  <router-view/>
  <div class="background">
    <img class="lt" :src="require('@/assets/images/lt.png')">
    <img class="rd" :src="require('@/assets/images/rd.png')">
    <img class="rt" :src="require('@/assets/images/rt.png')">
    <img class="ld" :src="require('@/assets/images/ld.png')">
  </div>
</template>

<style lang="scss">

@import "@/assets/css/app.scss";

#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $secondary;
  font-weight: bold;
}

nav{
  margin: auto;
  img{
    width: 70%;
    max-width: 600px;
    vertical-align: bottom;
    margin: 10px auto;
  }
}
.background{
  img{
    width: 35%;
    vertical-align: bottom;
    z-index: -100;
  }
  .lt{
    position: fixed;
    top: -5%;
    left: 0;
  }
  .rt{
    position: fixed;
    top: 0;
    right: 0;
  }
  .ld{
    position: fixed;
    bottom: -5%;
    left: 0;
  }
  .rd{
    position: fixed;
    bottom: -5%;
    right: 0;
  }
}
</style>
