<template>
   <div class="article-box clear-fix" >
     <div class="article-box-left float-left">
       <div class="article-content-part">
         <div class="article-header" style="padding-top: 10px">
           <div class="article-title">
             <span>{{articleDetail.title}}</span>
           </div>
           <div class="article-cover">
             <img :src="'/portal/image/'+articleDetail.cover">
           </div>
           <div class="article-publish-time" style="margin-top: 20px" >
               <img :src="articleDetail.userAvatar">
               <span style="font-size: 20px;color: #666;font-weight: 600; margin-left: 5px" >{{userInfo.userName}}</span>
               <span class="el-icon-date" style="margin-left: 5px">发表于</span>
               <span>{{formatDate(articleDetail.createTime)}}</span>
               <span class="el-icon-view" style="margin-left: 5px"> {{articleDetail.viewCount}}</span>
           </div>
           <div class="article-label">
             <el-tag
               v-for="(label,index) in articleDetail.labels"
               :key="'info_3'+index"
               effect="plain"
               size="mini">
               <a :href="'/search?keyword='+label" target="_blank">
                 {{label}}
               </a>
             </el-tag>
           </div>
         </div>
       </div>

       <div class="article-content-container" v-html="articleDetail.content">
       </div>
     </div>

     <div class="article-box-right float-left">

<!--我改变了改变了-->
       <div class="popularCard same-type">
         <PopularCard></PopularCard>
        </div>
       <div class="advertisement same-type">
         <div class="title same-type">
           <span style="color: #8A8A8A;margin-left: 5px">试试扫一下</span>
           <img src="http://47.103.216.205:2020/admin/image/1606179997260_780721024181207040.png" style="width: 225px ;height: 225px">
         </div>
       </div>
       <div id="taobao-loop-testscroll" class="taobao-loop">
         <AdvertisementLoop></AdvertisementLoop>
       </div>
     </div>
   </div>

</template>

<script>
  import * as api from '../../api/api'
  import * as dateUtils from '../../utils/date'
export default {
  asyncData({params}){
    return{
      articleId:params.id
    }
  },
  data(){
    return{
      articleDetail:[],
      userInfo:[]
    }
  },
  mounted() {
    this.getArticleById()

  },
  methods:{
    formatDate(dataStr){
      let date=new Date(dataStr);
      return dateUtils.formatDate(date,'yyyy-MM-dd:hh:mm:ss')
    },
    getArticleById(){

      api.getArticleById(this.articleId).then(result=>{
        if(result.code===20000){
          this.articleDetail=result.data;
          this.getUserInfo(this.articleDetail.userId)
        }else {
          this.$message.error(result.message)
        }
      })
    },
    getUserInfo(userId){
      api.getUserInfo(userId).then(result=>{
        this.userInfo=result.data;
      })
    }
  }
}
</script>

<style>
  .article-content-container{
    padding:20px;

  }
  .article-content-container img{
    max-width:850px ;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .article-label{
    margin-top: 10px;
  }
  .article-label .el-tag{
    margin-right: 8px;
    cursor: pointer;

  }
  .wordCloud text{
    cursor: pointer;
  }
  .article-publish-time img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .article-cover img{
    object-fit: cover;
    width: 100%;
    max-height: 200px;
    border-radius: 4px;
  }
  .article-title{
    font-size: 1.75rem;
    line-height: 36px;
    color: #212529;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .article-content-part{
    padding: 20px;
  }
  .article-box{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .article-box .article-box-left{
    width: 890px;
    margin-right: 20px;
    background: #FFFFFF;
  }
  .article-box .article-box-right{
    width: 230px;

  }
  .article-label .el-tag a{
    color: #8A8A8A;
  }
  .article-label .el-tag a:hover{
    color: #222222;
  }
  .article-box-right .same-type{
    background: #FFFFFF;
    margin-bottom: 10px;
    border-radius: 5px;
  }
</style>
