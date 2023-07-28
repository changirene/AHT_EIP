<template>
  <div class="wrapper">
    <div class="news">
      <div class="news-title">
        <h2>公告事項</h2>
      </div>
      <div class="news-content" v-for="item in list" :key="item.NewsId">
        <p class="news-date">{{ item.NewsAddDate }}</p>
        <h3 class="news-subject" @click="open(item.NewsId)">{{ item.NewsTitle }}</h3>
        <button type="button" id="open" class="news-more" @click="open(item.NewsId)">
          ...more
        </button>
      </div>
      
      <div class="news-pagination">
        <span
        v-if="page > 1 && newsList.length > 0"
        class="pages_button_prev"
        @click="setPage(page - 1)"
        >
        &lt;
        </span>
        <span
          v-for="p in pages"
          :key="p.id"
          @click="setPage(p)"
          :class="{ pages_button: true, 'pages_button--active': p == page }"
        >
          {{ p }}
        </span>
        <span
          v-if="page < pages.length && newsList.length > 0"
          class="pages_button_next"
          @click="setPage(page + 1)"
        >
          &gt;
        </span>
      </div>
    </div>
  </div>

  <!-- 燈箱 -->
  <div class="popup-mask" :style="modalStyle">
    <div class="popup-container" @click.self="close()">
      <div class="popup-body">
        <div class="popup-title">
          <h3 class="popup-subject">{{ popupData.NewsTitle }}</h3>
          <p class="popup-date">{{ popupData.NewsAddDate }}</p>
        </div>
        <div class="popup-content">
          <p v-html="popupData.NewsContent"></p>
          <!-- 在需要換行的地方加入<br> -->
        </div>
        <button type="button" @click="close()">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const url = 'http://172.17.100.110:3000';

export default {
  name: "NewsList",
  data() {
    return {
      activeId: "",
      page: 0, //當前頁碼
      pages: [], //總共頁數
      perPage: 14, //每頁多少項目
      list: [], //當前顯示項目
      newsList: [],
      Content:[],
    };
  },
  methods: {
    open(id) {
      this.activeId = id;
    },
    close() {
      this.activeId = NaN;
    },
    setPage(p) {
      if (p != this.page) {
        this.page = p;
        let minI = this.perPage * this.page - this.perPage;
        let maxI = this.perPage * this.page;
        this.list.length = 0;
        for (let i = minI; i < maxI && i < this.newsList.length ; i++) {
          this.list.push(this.newsList[i]);
        }
      }
    },
  },
  computed: {
    modalStyle() {
      return {
        display: this.activeId ? "" : "none",
      };
    },
    popupData() {
      return this.newsList.find((n) => n.NewsId === this.activeId) || {};
    },

  },
  mounted() {
    axios.get(`${url}/news`)
      .then((res) => {
        const filteredData = res.data.data.filter(data => data.NewsStatus === 1);
        this.newsList = filteredData.slice(0, 28);
        // console.log(this.newsList);
        let pagesAmount = Math.ceil(this.newsList.length / this.perPage);
        for (let i = 1; i <= pagesAmount; i++) {
          this.pages.push(i);
        }

        this.setPage(1);
        })
        .catch(err => {
          console.dir(err);
        });
},
}
</script>

<style scoped lang="scss">
@import "@/assets/css/app.scss";

.wrapper {
  width: 100%;
  margin: 10px;
  box-sizing: border-box;
  @include pad-width() {
    width: 90%;
  }
  @include pc-l-width() {
    width: 50%;
    height: 450px;
  }

  .news {
    @include news-border;
    height: 440px;
    position: relative;
    .news-title {
      h2 {
        font-size: 1.2em;
        text-align: left;
        padding: 5px 20px;
        border-bottom: $border;
      }
    }
    .news-content {
      display: flex;
      align-items: center;
      margin: 5px 20px;
      padding-bottom: 2px;
      border-bottom: 1px solid black;
      .news-date {
        font-size: 0.9em;
        margin: 0 10px;
        font-weight: normal;
      }
      .news-subject {
        font-size: 1em;
        cursor: pointer;
      }
      .news-more {
        margin-left: auto;
        margin-right: 10px;
        color: $secondary;
        cursor: pointer;
      }
    }
    .news-pagination {
      display: flex;
      justify-content: center;
      margin: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .pages_button, .pages_button_prev, .pages_button_next {
        cursor: pointer;
        font-size: 0.9em;
        background-color: $light;
        border: 2px solid $primary;
        color: $primary;
        padding: 5px 9px;
        border-radius: 50%;
        margin: 5px;
      }
  
      .pages_button:hover, .pages_button--active {
        background-color: $primary;
        color: #fff;
      }
    }
  }
}

//燈箱
.popup-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: table;
  backdrop-filter: blur(2px);
  z-index: 10;

  .popup-container {
    display: table-cell;
    vertical-align: middle;
    .popup-body {
      width: 80%;
      margin: auto;
      padding: 20px 30px 20px 20px;
      @include popup-border;
      @include pc-l-width() {
        width: 60%;
      }
      @include pc-width() {
        width: 45%;
      }
      .popup-title {
        border-bottom: 2px solid $primary;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        justify-content: space-between;

        .popup-subject {
          font-size: 1em;
          @include pad-width() {
            font-size: 1.3em;
          }
          @include pc-l-width() {
            font-size: 1.5em;
          }
        }
        .popup-date {
          font-size: 0.9em;
          margin: 0 10px;
        }
      }
      .popup-content {
        width: 100%;
        height: 400px;
        margin: 20px 10px;
        text-align: left;
        text-indent: 2em;
        line-height: 1.5;
        font-size: 0.9em;
        overflow-y: scroll;
      }
      button {
        cursor: pointer;
        color: $light;
        background-color: $primary;
        margin: auto;
        padding: 5px 20px;
        border-radius: 15px;
      }
    }
  }
}

//捲軸寬度
::-webkit-scrollbar {
  width: 5px;
}

//捲軸底色
// ::-webkit-scrollbar-track {
// }

//捲軸本體顏色
::-webkit-scrollbar-thumb {
  background: #dbeff9a3;
  border-radius: 10px;
}
</style>
