<template>
    <aside-bar/>
    <div class="wrapper">
      <header>
        <h2>最新公告管理</h2>
        <div class="logout">
          <router-link to="/"><button>登出</button></router-link> 
        </div>
      </header>
      <!-- 新增按鈕 -->
      <Button type="primary" class="add" @click="modal = true">新增 +</Button>
      <Modal
            v-model="modal"
            title="新增最新消息"
            ok-text="確認新增"
            cancel-text="取消"
            @on-cancel="addCancel"
            @on-ok="addOk"
            >
            
        <Form v-model="addList" :label-width="80">
          <!-- <FormItem label="編號">
            <text>{{ addList.NewsId }}</text>
          </FormItem>
          <FormItem label="上架日期">
            <Space size="large" wrap>
              <DatePicker 
              type="date" 
              readonly
              v-model="addList.NewsAddDate" 
              style="width: 200px"
               />
            </Space>
          </FormItem> -->

          <FormItem label="標題" prop="title">
            <Input type="text" placeholder="請輸入標題" v-model="addList.NewsTitle"></Input>
          </FormItem>
              
          <FormItem label="內容" prop="content">
            <Input type="textarea" class="textarea" v-model="addList.NewsContent" placeholder="請輸入消息內容"></Input>
          </FormItem>
          <!-- <FormItem label="狀態" >
            <i-switch 
            size="large" 
            v-model="addList.NewsStatus"
            true-value= "1"
            false-value= "0"
            >
                <template #open>
                  <span>上架</span>
                </template>
                <template #close>
                  <span>下架</span>
                </template>
            </i-switch>
            </FormItem> -->
        </Form>
      </Modal>

      <Table 
      class="custom-table" 
      stripe 
      :columns="columns" 
      :data="lists" 
      height="420px">
        <template #news_id="{ row }">
            <p>{{ row.NewsId }}</p>
        </template>
        
        <template #news_status="{ row }">
          <i-switch 
            size="large"  
            true-color="#057DCD" 
            v-model="row.NewsStatus"
            :before-change="handleBeforeChange" 
            :true-value=1
            :false-value=0
            >
                <template #open>
                  <span >上架</span>
                </template>
                <template #close>
                  <span >下架</span>
                </template>
            </i-switch>
        </template>

        <!-- 編輯視窗 -->
        <template #edit="{ row}">
          <Button type="primary" @click="editItem(row.NewsId)" class="edit-btn">編輯</Button>
          <Modal
            v-model="modal3[row.NewsId]"
            title="編輯最新消息"
            ok-text="確認修改"
            cancel-text="取消"
            @on-ok="editOk"
            @on-cancel="editCancel"
            >
            
            <Form v-model="addList" :label-width="80">
              <FormItem label="編號">
                <Input :border="false" readonly v-model="addList.NewsId" style="width: 50px"></Input>
              </FormItem>
              <FormItem label="上架日期">
                <Input :border="false" readonly v-model="addList.NewsAddDate" style="width: 90px"></Input>
                <!-- <Space size="large" wrap>
                  <DatePicker readonly type="date" v-model="row.NewsAddDate" placeholder="請選擇日期" style="width: 200px" />
                </Space> -->
              </FormItem>

              <FormItem label="標題" >
                <Input type="text" v-model="addList.NewsTitle" placeholder="請輸入標題"></Input>
              </FormItem>
                  
              <FormItem label="內容" >
                <Input v-model="addList.NewsContent" class="textarea" type="textarea" placeholder="請輸入消息內容"></Input>
              </FormItem>
            </Form>
          </Modal>
          <Button type="error" @click="remove(row.NewsId)">刪除</Button>
        </template>
    </Table>
      <Page
      :total="totalRows" 
      v-model="currentPage"
      :page-size="perPage" />
    </div>
  </template>
  
  <script>
  
  import AsideBar from '@/components/AsideBar.vue';
  import axios from 'axios';
  const url = 'http://172.17.100.110:3000';
  
  export default {
    name: 'NewsView',
    components: {
      AsideBar,
    },
    data () {    
            return {
              loading:false,
              modal: false, //新增彈窗
              modal2: [],
              modal3: [],
              formItem: {
                text: '',
                textarea: ''
                },
              currentPage: 1, //當前頁碼
              perPage: 8,//每頁多少項目
              columns: [
                  {
                      title: '編號',
                      slot: 'news_id',
                      align: 'center',
                      sortable: true, //是否排序
                      width: 100,
                  },
                  {
                      title: '上架日期',
                      key: 'NewsAddDate',
                      align: 'center',
                      sortable: true, //是否排序
                      width: 200,
                  },
                  {
                      title: '標題',
                      key: 'NewsTitle',
                      // width: 650,
                  },
                  {
                      title: '狀態',
                      slot: 'news_status',
                      align: 'center',
                      width: 120,
                  },
                  {
                      title: '編輯',
                      slot: 'edit',
                      align: 'center',
                      width: 220,
                  }
              ],
              newsList: [],
              ruleValidate: {
                    title: [
                        { required: true, message: '請輸入標題', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '請輸入內容', trigger: 'blur' }
                    ],
              },
              addList: {
                NewsId:'',
                NewsAddDate:'',
                NewsTitle:'',
                NewsContent:'',
                NewsStatus:1
              },
            }
        },
    methods: {
      
      handleBeforeChange () {
        return new Promise((resolve) => {
            this.$Modal.confirm({
                title: '更改狀態',
                content: '確認更改當前狀態?',
                onOk: () => {
                  this.addList.NewsStatus = this.addList.NewsStatus === 1 ? 0 : 1;
                  resolve();
                }
            });
        });
      },
      editItem(id) {
        this.modal3[id] = true;
        const editData = this.newsList.find(item => item.NewsId === id);
        this.addList = { ...editData };
      },
      editOk() {
        const editData = { ...this.addList };
        // console.log(editData); 
        const updateData = {
          NewsId:editData.NewsId,
          NewsTitle: editData.NewsTitle,
          NewsContent: editData.NewsContent
        };
        // console.log(updateData); 

        if (editData.NewsStatus !== undefined) {
          updateData.NewsStatus = editData.NewsStatus;
        }

        axios.patch(`${url}/news`, updateData )
          .then((res) => {
            const index = this.newsList.findIndex(item => item.NewsId === editData.NewsId);
              if (index !== -1) {
                this.newsList[index] = { ...this.newsList[index], ...updateData };
                this.$Message.success('編輯成功');
              } else {
                console.error('找不到符合條件的元素:', editData.NewsId);
              }
            
          })
          .catch(err => {
            console.dir(err);
            this.$Message.error('編輯失敗');
          });
      },
      editCancel(){
        this.addList={};
      },
      remove(id){
        this.modal2[id] = true;
        this.$Modal.confirm({
                    title: '刪除公告',
                    content: '<p>是否確認刪除?</p>',
                    okText: '刪除',
                    cancelText: '取消',
                    onOk: () => {
                      const deleteData = { NewsId: id };
                      console.log(deleteData);
                      axios.delete(`${url}/news`, { data: deleteData })
                        .then((res) => {
                          const index = this.newsList.findIndex(item => item.NewsId === id);
                          this.newsList.splice(index, 1);
                          // console.log(res.data.data,this.newsList);
                          this.$Message.success('成功刪除資料');
                        })
                        .catch(err => {
                          console.dir(err.response);
                          this.$Message.error('刪除資料失敗');
                        });
                    },
                });
      },
      addOk(){
        axios.put(`${url}/news`, this.addList)
          .then((res)=>{
            // const maxNewsId = Math.max(...this.newsList.map(item => item.NewsId));
            // this.addList.NewsId = maxNewsId + 1;
            this.newsList.push(this.addList);
            this.addList = {};
            // console.log(res.data.data);
            this.$Message.success('新增資料成功');
          })
        .catch(err => {
            this.addList = {};
            console.dir(err.response);
            this.$Message.error('新增資料失敗');
          });
      },
      handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      axios.put(`${url}/news`, this.addList)
                      .then((res)=>{
                        const maxNewsId = Math.max(...this.newsList.map(item => item.NewsId));
                        this.addList.NewsId = maxNewsId + 1;
                        this.newsList.push(this.addList);
                        this.addList = {};
                        // console.log(res.data.data);
                        this.$Message.success('新增資料成功');
                      })
                    } else {
                      this.$Message.error('新增資料失敗');;
                    }
                })
            },
      addCancel(){
        this.addList = {};
      }
    },
    mounted() {
      axios.get(`${url}/news`)
        .then((res) => {
          this.newsList = res.data.data;
          // console.log(this.newsList)
        })
        .catch(err => {
          console.dir(err);
        });
        
    },
    computed: {
      lists() {
        const data = this.newsList.sort((a,b)=>b.NewsId-a.NewsId); 
        return data.slice((this.currentPage - 1) * this.perPage, this.perPage * this.currentPage);
        
      },
      totalRows() {
        return this.newsList.length;
      }
    },
  }


  </script>
  <style lang="scss" scoped>
  
  .wrapper{
    width: 80%;
    margin: 0 20px 0 270px;
    padding-top: 10px;
    background-color: #ffffff00;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    header{
      display: flex;
      justify-content: space-between;
      h2{
        font-size: 45px;
        font-weight: bolder;
        padding: 5px 10px;
        margin: 10px 15px;
        border-bottom: 3px solid #057DCD;
        -webkit-text-stroke: 0.5px #057DCD;
      }
      .logout{
        button{
          font-size: 17px;
          font-weight: bold;
          background-color: #d5ecf7;
          padding: 8px 20px;
          margin: 10px 20px;
          border-radius: 20px;
          color: #057DCD;
          cursor: pointer;
        }
      }
    }
    .add{
          width: 80px;
          font-size: 16px;
          margin-top: 20px;
    }
    .custom-table{
      margin: 30px 10px;
      .edit-btn{
        margin-right: 20px;
      }
      
    }
    .news-pagination {
      display: flex;
      justify-content: center;
      margin: 5px;
      .pages__button, .pages__button_prev, .pages__button_next {
        cursor: pointer;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #d2d2d2;
        color: #747474;
        padding: 9px 12px;
        margin: 5px;
        border-radius: 5px;
      }

      .pages__button:hover, .pages__button--active {
        border: 1px solid #057DCD;
        color: #057DCD;
      }
    }
  }
  
  </style>
  