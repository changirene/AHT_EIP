<template>
  <h2><img :src="require('@/assets/images/AHT-BACK-LOGO.png')" alt="aht-logo"></h2>
  <div class="login">
      <h3>使用者登入</h3>
      <!-- <Login @on-submit="handleSubmit"> -->
      <Login class="login-form">
          <UserName name="username" placeholder="請輸入帳號" />
          <Password name="password" placeholder="請輸入密碼"/>
          <router-link to="news"><button>登入</button></router-link> 
      </Login>
      <div class="decoration"></div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LoginView',
  components: {
  },
  data () {
            return {
                autoLogin: true
            }
        },
        methods: {
           
        }
}
</script>
<style lang="scss" scoped>
  h2{
    width: 600px;
    margin: 50px auto;
    img{
      width: 100%;
      vertical-align: bottom;
    }
  }

  .login{
    width: 400px;
    height: 300px;
    border: 6px solid #0B509B;
    box-shadow: 6px 6px 1px #c7eef9;
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 20px;
    padding: 20px;
    h3{
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
      color: #0B509B;
    }
    .login-form{
      button{
        font-size: 17px;
        font-weight: bold;
        background-color: #d5ecf7;
        padding: 8px 50px;
        margin: 10px 20px;
        border-radius: 20px;
        color: #057DCD;
        cursor: pointer;
      }
    }
    .decoration{
      position: absolute;
      width: 90px;
      height: 90px;
      background-color: #FFF9D2;
      bottom: -45px;
      right: -45px;
      z-index: -1;
      border-radius: 40% 50% ;
    }
  }

</style>
