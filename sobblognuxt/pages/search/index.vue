<template>
  <div class="container">
    <div class="search-head">
      <div class="search-search" >
        <div class="search-input_and_button">
            搜索：
          <el-input
            v-model="keyword"
            @keyup.enter.native="getSearch()"
            placeholder="搜索内容"
            size="mini"
            style="width:15em" ></el-input>
          <el-button
            @click="getSearch()"
            type="primary"
            size="mini">确认 </el-button>
        </div>
      </div>
      <div class="search-category" >
        <span>综合排序：</span>
        <div class="list-cate"
             style="display: inline;"
             v-for="(item,index) in cate2"
             :key="index"
             :class="cateNumber===item.id?'categories-item-active':'list-cate'"
             @click="getSearch">
            <span
                @click="cateNumber=item.id"
                v-text="item.name" >
            </span>
        </div>
      </div>
      <div class="search-category" >
        <span>全部分类：</span>
        <div class="list-cate"
             style="display: inline;"
             @click="getSearch"
             v-for="(item,index) in categories"
             :key="index"
             :class="categoryId===item.id?'categories-item-active':'list-cate'">
            <span
              @click="categoryId=item.id,pageNavigation.currentPage=1"
              v-text="item.name">
            </span>
        </div>
      </div>
    </div>
    <div  class="search-content clear-fix">
      <div class="search-list float-left">
        <!-- 搜索不出内容，就可以在这个div填充提示，否则，隐藏 -->
        <div id="search-list"></div>

        <div class="search-article"
             v-for="(item,index) in searchAr"
             :key="'info_2'+index">
          <div class="article-title" >
            <a :href="'/article/'+item.id">
              <span class="title"
                    v-html="item.blogTitle">
              </span>
            </a>
          </div>
          <div class="article_content product-buyer-name" >
            <span v-html="item.blogContent"></span>
            <span>.....</span>
          </div>
        </div>
        <div id="article-navigation" class="article-navigation">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="onPageChang"
            :pageSize="pageNavigation.pageSize"
            :total="pageNavigation.totalCount"
            :current-page="pageNavigation.currentPage">
          </el-pagination>
        </div>
      </div>
      <div class="search-right float-left">
        <PopularCard></PopularCard>
        <br>
        <AdvertisementLoop></AdvertisementLoop>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/api';
  import * as utils from '../../api/utils'
export default {
  asyncData({query}){
    return{
      keyword:query.keyword,
    }
  },
  data(){
    return{
      categories:[],
      categoryId:'',
      cateNumber:1,
      cate2:[{"name":"时间升序","id":1},{"name":"时间降序","id":2},
             {"name":"浏览量升序","id":4},{"name":"浏览量降序","id":3}],
      searchAr:[],
      pageNavigation:{
        currentPage:1,
        totalCount:2,
        pageSize:2
      }
    }
  },
  mounted() {
    this.getCategories();
    this.getSearch();
  },
  methods:{
    onPageChang(page){
      api.getSearch(this.keyword,page,this.pageNavigation.pageSize,this.categoryId,this.cateNumber).then(result=>{
        if(result.code===20000){
            this.handleResult(result)
        }
        else {
          this.$message({
            type: 'error',
            duration:1000,
            message: result.message
          });
        }
      })
    },
    getSearch(){
      api.getSearch(this.keyword,this.pageNavigation.currentPage,this.pageNavigation.pageSize,this.categoryId,this.cateNumber).then(result=>{
        if(result.code===20000){
          this.handleResult(result)
          if (result.data.totalCount===0){
            this.$message({
              type: 'error',
              duration:1000,
              message: '暂时无结果!'
            });
            this.tipNoResult()
          }else {
            this.tipHidden()
          }
        }
      })
    },
    tipNoResult(){
      var content_search=document.getElementById("search-list");
      content_search.innerHTML="没有找到内容";
      content_search.style.background="#ffffff";
      content_search.style.display="inline-block";
      content_search.style.textAlign="center";
      content_search.style.lineHeight='200px';
      content_search.style.height="200px";
      content_search.style.width="890px";
     document.getElementById("article-navigation").style.display="none"
    },
    tipHidden(){
      var content_search=document.getElementById("search-list");
      content_search.style.display="none";
      document.getElementById("article-navigation").style.display="block"
    },
    handleResult(result){
        this.searchAr=result.data.contents;
        this.pageNavigation.currentPage=result.data.currentPage,
        this.pageNavigation.totalCount=result.data.totalCount,
        this.pageNavigation.pageSize=result.data.pageSize;
    },
    getCategories()
    {
      let cate=utils.testSessionStorage("Categories");
      if(cate===null){
        api.getCategories().then(result=>{
            if(result.code===20000){
              this.categories=result.data;
              sessionStorage.setItem("Categories",JSON.stringify(result.data))
            }
        })
      }else {
        this.categories=cate;
      }
      this.cateNumber=1;
    }
  }
}
</script>

<style>
  .search-head{
    margin-top: 10px;
    background: #FFFFFF;
    padding-bottom: 20px;
  }
    .search-search{
      text-align: center;
    }
      .search-input_and_button{
        margin-top: 20px;
        display: inline-block;

      }
    .search-category{
      margin: 15px 0 0 30px;
      padding: 10px 0 0 0 ;
    }
      .list-cate{}
      .categories-item-active{
        font-weight: bold;
      }
      .list-cate span {
        margin-right: 20px;
        font-size: 12px;
        cursor: pointer;
      }

  .search-content{}
    .search-list{
      margin-top: 10px;
      width: 890px;
      margin-right: 20px;
    }
      .search-article{
        background: #ffffff;
        margin-bottom: 10px;
        border-radius: 5px
      }
        .article-title{
          font-size: 20px;
          padding: 10px 0 0 10px;
        }
        .article-title span{
          color: #222222;
        }
        .article_content{
          padding: 15px;
          color: #8A8A8A;
          font-size: 15px
        }
        .product-buyer-name {
          display:inline-block;
          max-width: 870px;
          max-height: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      .article-navigation{}

  .search-right{
    margin-top: 10px;
    width: 230px;
  }

</style>
