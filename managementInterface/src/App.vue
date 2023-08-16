<template>
  
    <div class="container">
      <router-view v-if="isRouterAlive" />
    </div>
    <div class="background">
    <img class="lt" :src="require('@/assets/images/lt.png')">
    <img class="rd" :src="require('@/assets/images/rd.png')">
  </div>
</template>
<script>
  
    export default {
      component:{
      },
      data () {
        return {
          isRouterAlive: true,
        }
      },
      provide(){
        return{
          reload: this.reload
        }
      },
      methods: {
        async reload(){
          // console.log('reload!');
          this.isRouterAlive = false;
          await this.$nextTick();
          this.isRouterAlive = true;
          // this.$nextTick(()=>{
          //   this.isRouterAlive = true;
          // })
        }
      },
    }
</script>
<style lang="scss">

@import "@/assets/css/app.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #057DCD;
}
.background{
  img{
    width: 35%;
    vertical-align: bottom;
    z-index: -100;
  }
  .lt{
    position: fixed;
    top: -20%;
    left: 0;
  }
  .rd{
    position: fixed;
    bottom: -15%;
    right: 0;
  }
}
</style>
