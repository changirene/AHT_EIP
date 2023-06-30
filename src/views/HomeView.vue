<template>
  <div class="container">
    <news-list></news-list>
    <card-list></card-list>
  </div>
</template>

<script>
import NewsList from '@/components/NewsList.vue'
import CardList from '@/components/CardList.vue'

export default {
  components: {
     CardList,
     NewsList 
    },
  name: 'HomeView',
  
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/app.scss";
.container{
 width: 100%;
 margin: 40px auto;
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
}


</style>
