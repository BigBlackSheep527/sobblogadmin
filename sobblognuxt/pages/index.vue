<template>
    <div id="index-page-box"  class="index-page-box clear-fix">
      <div id="index-left-part"class="index-left-part float-left">
          <div class="user-avatar">
              <img :src="userInfoText.avatar">
          </div>
          <div class="user-name">
            <a v-if="userInfoText.userName==='未登录'"  :href="'/login'">
              <span v-text="userInfoText.userName" ></span>
            </a>
            <a v-else>
              <span v-text="userInfoText.userName" ></span>
            </a>
          </div>
          <div class="user-sign">
              <span v-text="userInfoText.sign" ></span>
          </div>
          <div class="left-user-self-links">
            <el-tooltip class="item" effect="dark" content="退出登录" placement="top-start">
              <span class="sob_blog sobtuichu ; " @click="doLogout"></span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="bibi" placement="top-start">
              <span class="sob_blog sobbilibili-line   "></span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="CSDN" placement="top-start">
              <a href="https://blog.csdn.net/Ahhjhhj?spm=1010.2135.3001.5113">
                <span class="sob_blog sobview "></span>
              </a>
            </el-tooltip>



          </div>
          <div class="list-categories">
            <div :class="categoryId===item.id?'categories-item-active':'categories-item'"
                 v-for="(item,index) in categories" :key="index">
                <span v-text="item.name" @click="listArticleByCategoryId(item)"></span>
            </div>
          </div>

      </div>

      <div id="index-center-part" class="index-center-part float-left">
        <div class="loop-box default-border-radius" >
            <template >
              <el-carousel :interval="5000" arrow="always" >
                <el-carousel-item v-for="(item,index) in loops" :key="'info_1'+index">
                  <img :src="item.imageUrl" style="object-fit: cover" lazy>
                </el-carousel-item>
              </el-carousel>
            </template>
        </div>
        <div class="article-box default-border-radius ">
          <div class="article" v-for="(item,index) in topArticles" :key="'info_2'+index">
            <div class="article-title">
              <span class="top-tips  "> 置顶</span>
              <a :href="'/article/'+item.id">
                <span class="title"  v-text="item.title" ></span>
              </a>
            </div>
            <div class="summary">
              <span v-text="item.summary"></span>
              <span>.....</span>
              <el-tag size="mini" style="cursor: pointer" ><a :href="'/article/'+item.id">阅读原文</a></el-tag>
          </div>
            <div class="label" >
              <el-tag
                v-for="(label,index) in item.labels"
                :key="'info_3'+index"
                effect="plain"
                size="mini">
                <a :href="'/search?keyword='+label" target="_blank">
                  {{label}}
                </a>

              </el-tag>
            </div>
          </div>
          <div class="article clear-fix" v-for="(item,index) in listArticle" :key="'info_4'+index">
            <div class="article-left  float-left ">
              <div class="article-img ">
                <el-image :src="'http://47.103.216.205:2020/admin/image/'+item.cover" style="object-fit: cover" lazy></el-image>
              </div>
            </div>
            <div class="article-right  float-left">
              <div class="article-title">
                <a :href="'/article/'+item.id">
                <span class="title"  v-text="item.title"></span>
                </a>
              </div>
              <div class="summary">
                <span v-text="item.summary"></span>
                <span>.....</span>
                <el-tag size="mini" style="cursor: pointer" ><a :href="'/article/'+item.id">阅读原文</a></el-tag>
              </div>
              <div class="FFFFFF"  >
                <el-tag
                  v-for="(label,index) in item.labels"
                  :key="'info_5'+index"
                  effect="plain"
                  size="mini">
                  <a :href="'/search?keyword='+label" target="_blank">
                    {{label}}
                  </a>
                </el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="article-navigation">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="onPageChang"
            :pageSize="pageNavigation.pageSize"
            :total="pageNavigation.totalCount"
            :current-page="pageNavigation.currentPage"
            >
          </el-pagination>
        </div>

      </div>
      <div class="index-right-part float-left">
        <div class="content-search" >
        <el-input
          @keyup.enter.native="toSearch()"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="keyword">
        </el-input>
      </div>
        <PopularCard></PopularCard>

        <div class="advertisement">
          <div class="title">
            <span >试试扫一下</span>
            <img src="http://47.103.216.205:2020/admin/image/1606179997260_780721024181207040.png" style="width: 225px ;height: 225px">
          </div>

        </div>
        <AdvertisementLoop></AdvertisementLoop>

      </div>
    </div>

</template>

<script>
  import * as api from '../api/api'
  import * as utils from '../api/utils'

  export default {
    data(){
      return {
        keyword:'',
        margin:{top: 0, right: 0, bottom: 0, left: 0 },
        rotate:{from: -20, to: 40, numOfOrientation: 8 },
        fontSize:[20, 50],
        wordPadding:3,
        defaultWords: [],
        categoryId:'',
        isLogin:true,
        userInfoText:{
          avatar:'https://cdn.sunofbeaches.com/images/default_avatar.png',
          userName:"未登录",
          sign:"登录才能够看到哦"
        }
      }
    },
    created() {

    },

    mounted() {
      this.listLabel();
      this.onWindowScroll();
      this.textLogin();
      let that=this;
      window.onresize=function () {
        that.onWindowScroll()
      }
      // 监听滑动
      window.addEventListener('scroll',this.onWindowScroll)
    },
    beforeDestroy() {

      //销毁监听，释放资源
      window.removeEventListener('scroll',this.onWindowScroll);
    },
    methods:{
      doLogout(){
        if(!this.isLogin){
         return
        }
        api.doLogout().then(result=>{
          console.log(result.code)
        if(result.code===20000){
          this.$message.success(result.message)
          location.href='/';
        }else {
          this.$message.error(result.message)
          this.isLogin=false
        }
      })
      },
      textLogin(){
        api.textLogin().then(result=>{
          if(result.code===20000){

            this.userInfoText=result.data;
            if(result.data.sign===null){
              this.userInfoText.sign='暂时没有签名，该用户似乎很懒~'
              this.isLogin=true;
              // location.reload()
            }
          }else{
            console.log(result.message)
          }
        })
      },
      listArticleByCategoryId(item){
        this.categoryId=item.id;
        //页数重置为第一页
        this.pageNavigation.currentPage=1;
        api.listArticle(this.categoryId,this.pageNavigation.currentPage,this.pageNavigation.pageSize).then(result=>{
            this.handleResult(result);
        })

      },
      toSearch(){
        this.keyword=this.keyword.trim()
        if(this.keyword===''){
          return
        }else {
          //todo:
          this.$router.push({
            path:'/search',
            query:{
              keyword:encodeURIComponent(this.keyword),
              text:'text'
            }
          })
          // location.href='/search/'+encodeURIComponent(this.keyword);
        }

      },
      onWindowScroll(){
        let scrolledTop=document.documentElement.scrollTop;
        let scrolledLeft=document.documentElement.scrollLeft;
        let centerPart=document.getElementById('index-center-part');
        let leftPart=document.getElementById('index-left-part');
        let parentPart=document.getElementById('index-page-box');
        // console.log("centerPart--->"+centerPart+"    leftPart--->"+leftPart)


        if(centerPart||leftPart||scrolledLeft){
          let baseTop=centerPart.offsetTop;
          console.log(baseTop)
          if(scrolledTop<=baseTop){
            leftPart.style.top=(baseTop-scrolledTop)+'px'
          }else{
            leftPart.style.top='5px'
          }
          if(scrolledLeft>0){
            leftPart.style.left=-scrolledLeft+'px';
          }else{
            leftPart.style.left=parentPart.offsetLeft+'px'
          }
        }
        //右边悬浮

        let taobaoPart=document.getElementById('taobao-loop-testscroll');
        let cardPart=document.getElementById('always-used-cards');

        if(taobaoPart){
          let baseTop=taobaoPart.offsetTop+taobaoPart.offsetHeight
          if (scrolledTop >= baseTop) {

            cardPart.style.position='fixed';
            cardPart.style.top='10px';
            cardPart.style.width='230px';
          }else{

            cardPart.style.position='';
            cardPart.style.top='';
          }
          if(scrolledLeft>0){
            cardPart.style.left=parentPart.offsetWidth-scrolledLeft-cardPart.offsetWidth+parentPart.offsetLeft+'px'
          }else{
            cardPart.style.left=parentPart.offsetWidth-cardPart.offsetWidth+parentPart.offsetLeft+'px'
          }
        }

      },
      listLabel(){
        let listLabel=utils.testSessionStorage("listLabel")
        if(listLabel!==null){
          this.defaultWords=listLabel;
          return;
        }
        api.listLabel(8).then(result=>{
          if(result.code===20000){
            this.defaultWords=result.data.content;
            console.log("我是请求")
            sessionStorage.setItem("listLabel",JSON.stringify(result.data.content));
          }
        })
      },

      wordClickHandler(name, value, vm) {
        // location.target="_blank";
        location.href='/search?keyword='+name
      },
      handleResult(result){
        if(result.code===20000){
          this.listArticle=result.data.content;
          //切换页面回到顶部
          let topHeader=document.getElementById('blog-header');
          if(topHeader){
            topHeader.scrollIntoView({
              block:'start',
              behavior:"smooth"
            })
          }
            this.pageNavigation.currentPage=result.data.number+1,
            this.pageNavigation.totalCount=result.data.totalElements,
            this.pageNavigation.pageSize=result.data.size
        }else{
          this.$message.error(result.message);
        }
      },
      onPageChang(page){
          api.listArticle(this.categoryId,page,this.pageNavigation.pageSize).then(result=>{
            this.handleResult(result);
          })
      }
    },
    async asyncData({params}){
      let userInfo=await api.getAdminInfo();
      let categories=await api.getCategories();
      let loops=await api.getLoops();
      let topArticles=await api.getTopArticle();
      let listArticle=await api.listArticle('',1,5);
      let allCategory=[];
      allCategory.push({
        name:'全部分类',
        id:''
      });
      allCategory=allCategory.concat(categories.data);
      let  pageNavigation={
          currentPage:listArticle.data.number+1,
          totalCount:listArticle.data.totalElements,
          pageSize:listArticle.data.size
        };

        return {
          userInfo:userInfo.data,
          categories:allCategory,
          loops:loops.data,
          topArticles:topArticles.data,
          listArticle:listArticle.data.content,
          pageNavigation:pageNavigation,

      };
    }
  }
</script>
<!--1140px分为 240 660 240-->
<style>

  #index-left-part{
    position: fixed;
    text-align: center;
  }
  .article-title a{

    color: black;
  }
  .summary .el-tag a{
    color: #535353;
  }
  .summary .el-tag a:hover,.article-title a:hover{
    color: #FF4500;
  }
  .loop-box .el-carousel__container {
    height: 250px;
  }
  .wordCloud .text{
    cursor:pointer;
  }
  .index-right-part{
    width: 230px;
    margin-left: 10px;
  }
  .index-right-part .content-search{
    margin-bottom: 10px;
    background: #FFFFFF;
  }
  .index-right-part .always-used-cards{

    margin-bottom: 10px;
    background: #FFFFFF;
    font-weight: 600;

  }
  .label-list-box .wordCloud{
    height: 200px;
  }
  .index-right-part .advertisement{
    margin-bottom: 10px;
    background: #FFFFFF;
    font-weight: 600;
  }
  .always-used-cards .title, .advertisement .title{
    font-size: 15px;
    color: #8A8A8A;
    padding: 5px;
  }


  .article-navigation{
    margin-top: 10px;
  }
  .article-navigation .el-pagination.is-background .el-pager li{
    background-color: #FFFEFF;
  }
  .article-left{
    margin-right: 10px;
  }
  .article-img img{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    border-radius:5px

  }
  .summary{
    font-size: 12px;
  }
  .label{
    margin-top: 10px;
  }
  .label .el-tag{
    margin-right: 8px;
    cursor: pointer;
  }
  .label .el-tag a,.article-right .el-tag a{
    color: #8A8A8A;
  }
  .label .el-tag a:hover,.article-right .el-tag a:hover{
    color: #222222;
  }
  .article{
    margin-top: 10px;
    padding: 10px;
    background: #FFFEFF;
  }
  .article-title{
    margin-bottom: 10px;
  }
  .article .top-tips {
    padding: 3px;
    background: orangered;
    font-size: 10px;
    color: #F2F2FA;
    border-radius: 3px;
  }
  .article .title{
    font-size: 18px;
    font-weight: 600;
  }
  .loop-box{
    padding: 10px;
    background: #FFFEFF;
  }
  .loop-box img{
    width: 100%;
    height: 400px;
    border-radius: 5px;
  }
  .loop-box .el-carousel__button{
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .list-categories{
    margin-top: 15px;
  }
  .list-categories .categories-item  {
    padding: 15px;
    border-radius: 5px;
  }
  .list-categories .categories-item-active{
    padding: 15px;
    color:#535353;
    border-radius: 5px;
    background: #D4D4D4;
  }
  .list-categories .categories-item span{
    font-size: 16px;
    font-weight: 600;
    color: #8A8A8A;
    cursor: pointer;
    text-align: center;

  }
  .list-categories .categories-item span:hover{
    color:#535353;
  }
  .index-left-part .user-avatar img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .index-left-part .user-name span{
    margin-top: 10px;
    color: #8A8A8A;
    font-size:25px ;
  }
  .index-left-part .user-sign span{
    color: #D4D4D4;
    font-size:13px ;
  }
  .user-name{
    margin-top: 15px;
  }
  .user-sign{
    margin-top: 15px;

    display:inline-block;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .left-user-self-links{
    margin-top: 15px;

  }
  .index-left-part .left-user-self-links span{
    font-size: 30px;
    font-weight: 600;
    margin-right: 15px;
    margin-left: 10px;
    color: #8A8A8A;
    cursor: pointer;
  }
  .left-user-self-links span:hover{
    color:#535353 ;
  }
  .index-page-box{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .index-left-part{
    margin-right: 10px;
    text-align: center;
  }
  .index-center-part{
    margin-left: 250px;
    margin-right: 10px;
    width:640px;
  }

  .index-left-part{
    width: 230px;
    background: #FFFFFF;

  }



</style>
