<template>
    <Menu :theme="theme" active-name="1" class="sidebar">
        <h1 class="logo">
            <router-link to="/news">
                <img :src="require('@/assets/images/AHT-BACK-LOGO-V.png')" alt="aht-logo">
            </router-link>
        </h1>
        <MenuItem name="1" to="/news" class="news">
        <Icon type="ios-paper" />
      		最新公告管理
        </MenuItem>
       
    </Menu>
   
</template>
<script>
import { MenuItem } from 'view-ui-plus';
    export default {
    data() {
        return {
            theme: "light"
        };
    },
    components: {
         MenuItem 
        }
}
</script>
<style lang="scss" scoped>
.sidebar{
  width: 240px;
  height: 100%;
  position: fixed;
  outline: 2px solid #C0DEF2;
  background-color: #ffffff00;
  .logo{
    width: 100%;
    margin: 30px auto;
    img{
        width: 80%;
        vertical-align: bottom;
    }
  }
}
a, .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active{
  height: 60px;
  line-height: 35px;
  font-weight: bold;
  font-size: 20px;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background-color: #f0f9fe92;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
    width: 3px;
}

</style>