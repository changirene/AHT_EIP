<template>
  <h2><img :src="require('@/assets/images/AHT-BACK-LOGO.png')" alt="aht-logo"></h2>
  <div class="login">
      <h3>使用者登入</h3>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="account" style="width:250px" class="account">
            <Input type="text" v-model="formInline.account" placeholder="請輸入帳號">
                <template #prepend>
                  <Icon type="ios-person-outline"></Icon>
                </template>
            </Input>
        </FormItem>
        <FormItem prop="password" style="width:250px" class="password">
            <Input type="password" v-model="formInline.password" placeholder="請輸入密碼">
                <template #prepend>
                  <Icon type="ios-lock-outline"></Icon>
                </template>
            </Input>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit('formInline')">登入</Button>
        </FormItem>
    </Form>
      <div class="decoration"></div>
    </div>
</template>

<script>

import axios from 'axios';
const url = 'http://172.17.100.110:3000';

export default {
  name: 'LoginView',
  components: {
  },
  data () {
        return {
          formInline: {
              account: '',
              password:''
          },
          ruleInline: {
              account: [
                  { required: true, message: '請輸入帳號', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '請輸入密碼', trigger: 'blur' }
              ]
          }
                }
        },
        methods: {
        handleSubmit(name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                    axios.post(`${url}/login`,this.formInline)
                      .then((res) => {
                          // const{ token , expired } = res.data;
                          // console.log(token,expired);
                          // document.cookie = `hexToken=${ token }; expires=${ new Date(expired)};HttpOnly;`;
                          // console.log(res.data.status);
                          this.$Message.success('登入成功');
                          if (res.data.status === 'success') {
                            this.$router.push("/news");
                        }
                      })
                        .catch(error =>{
                          console.dir(error);
                          this.$Message.error('登入失敗，請重新輸入');
                      })
                  }
              })
          },
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
    .account, .password{
      margin: 20px auto;
    }
    
    button{
      font-size: 17px;
      font-weight: bold;
      border: none;
      background-color: #d5ecf7;
      padding: 15px 50px;
      margin: 25px auto;
      border-radius: 20px;
      line-height: 3px;
      color: #057DCD;
      cursor: pointer;
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
