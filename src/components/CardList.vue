<template>
  <div class="wrap">
    <div class="card" v-for="item in cardList" :key="item.title">
      <a :href="item.URL" target="_blank">
        <div class="card-item">
          <img :src="require(`@/assets/images/${item.imgURL}`)">
          <h4>{{ item.title }}</h4>
        </div>
      </a>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardList',
  data() {
    return {
      cardList:[
        {
          title : "行事曆",
          imgURL: "calendar.png",
          URL :"https://www.ahit.com.tw/",
        },
        {
          title : "FTP",
          imgURL: "ftp.png",
          URL :"http://ftp.ahit.com.tw/",
        },
        {
          title : "NAS",
          imgURL: "nas.png",
          URL :"http://172.17.100.90/",
        },
        {
          title : "電子簽核",
          imgURL: "flowchart.png",
          URL :"https://www.uof.tw/aht/",
        },
        {
          title : "常用表單",
          imgURL: "form.png",
          URL :"https://www.uof.tw/aht/WKF/FormUse/PersonalBox/ApplyFormList.aspx?formId=d4c2234b-8d73-4812-a127-5aca096aad62&fillFormDirectly=true",
        },
        {
          title : "通訊錄",
          imgURL: "contacts.png",
          URL :"https://www.ahit.com.tw/",
        },
        {
          title : "福利制度",
          imgURL: "employee.png",
          URL :"https://www.ahit.com.tw/",
        },
        {
          title : "人事制度",
          imgURL: "man.png",
          URL :"https://www.ahit.com.tw/",
        },
        {
          title : "分機座位表",
          imgURL: "telephone.png",
          URL :"https://www.ahit.com.tw/",
        },
      ]
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/css/app.scss";
.wrap{
  width: 100%;
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  height: fit-content;
  @include pad-width(){
    width: 70%;
  }
  @include pc-l-width(){
    width: 40%;
  }
  @include pc-width(){
    width: 35%;
  }

  .card{
    width: 100px;
    height: 100px;
    @include card-border;
    // box-shadow: 2px 2px 0px $d-border;
    margin: 15px auto;
    position: relative;
    a{
      .card-item{
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;
        img{
          width: 60%;
          margin: auto;
          vertical-align: bottom;
        }
        h4{
          color: $secondary;
          font-size: 0.9em;
          text-align: center;
        }
      }
    }
    &:hover .box{
      background-color: $hover;
    }
    .box{
      @include hover-border;
      background-color: $light;
      width: 50px;
      height: 50px;
      position: absolute;
      right: -25px;
      bottom: -25px;
      z-index: -1;
    }
  }
}

</style>
