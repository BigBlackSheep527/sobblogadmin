<template>
  <div id="blog-box">
    <div id="blog-header" class="blog-header clear-fix default-border-radius" >
      <div class="logo-box float-left">
        <div class="logo">
          黄豆芽博客
        </div>
      </div>
      <div class="login-tips-text-box float-right" v-if="isShow==='noLogin'" >
        <a :href="'/login'+redirectPath">
          <span><i class="sob_blog sobfingermap "></i> 登录</span>
        </a>
        <a :href="'/register?keyword=register'">
          <span><i class="sob_blog sobmembers-add "></i> 注册</span>
        </a>
      </div>
      <div class="login-tips-text-box float-right" v-if="isShow==='login'" >
        <a :href="'/userInfo/'">
          <span>个人中心</span>
        </a>
        |
        <a href="http://mp.huangdouya.group/#/index" v-if="roles==='role_admin'">
          <span>后台管理</span>
        </a>
        <a  v-else>
          <span style="color: #8A8A8A">后台管理</span>
        </a>
      </div>
      <div class="navigation-box float-right">
          <a href="/">
            <span><i class="sob_blog sobhome "></i> 首页</span>
          </a>
          <a href="/link">
            <span><i class="sob_blog soblink "></i> 友链</span>
          </a>
          <a href="/about">
            <span><i class="sob_blog sobabout_line  "></i> 关于</span>
         </a>
      </div>
    </div>
    <!-- 中间部分-->
    <Nuxt/>
    <div class="blog-footer">
      <div>
        <a href="/about">
          <span>关于我们</span>
        </a>
        |
        <a href="/about">
          <span>联系我们</span>
        </a>
        |
        <a href="/link">
          <span>友情链接</span>
        </a>
        |
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44060502002344" target='_BLANK'>
          <span>粤ICP备2020117959号</span>
        </a>
      </div>
      <div class="copy-right-box">
        <p>
          Copyright @
          <a href="https:www.sunofbeach.net" target="_blank">
            阳光沙滩
          </a>
          （2019-2020）本网站仅供学习所用
        </p>
      </div>
    </div>
    <div id="g-to-top" style="display: none" @click="toTop()">
      <div class="el-icon-caret-top" ></div>
      <div>回到<br>顶部</div>
    </div>
  </div>
</template>
<script>
  import * as api from "../api/api"
  export default {
    data(){
      return{
        isShow:'noLogin',
        roles:'role_normal',
        redirectPath:'',
        userInfo:[]
      }
    },
    mounted() {
      this.textLogin()

      if(this.redirectPath!=='?redirect='+location.href&&
         this.$route.path!=='/' &&
         this.$route.path!=='/login'&&
        this.$route.path!=='/register'){
        this.redirectPath='?redirect='+location.href;
      }

      window.addEventListener('scroll',this.onWindowScroll)
    },
    beforeDestroy() {

      window.removeEventListener('scroll',this.onWindowScroll);
    },
    methods:{
      toTop(){
        document.documentElement.scrollTo({
          top:0,
          behavior:'smooth'
        })
      },
      onWindowScroll(){
        let scrolledTop=document.documentElement.scrollTop;
        console.log(scrolledTop)
        if(scrolledTop>370){
          document.getElementById('g-to-top').style.display='block'
        }else {
          document.getElementById('g-to-top').style.display='none'
        }
      },
      textLogin(){
        api.textLogin().then(result=>{
          if(result.code===20000){
            this.isShow='login'
            this.roles=result.data.roles
            this.userInfo=result.data
          }
        })
      }
    }
  }
</script>
<style>
  #blog-box{
    width: 1140px;
    margin: 0 auto;
  }
    .blog-header{
      background: #Fff;
     }
      .logo-box{
        margin-left: 10px;
      }
      .logo-box .logo{
        margin-top: 5px;
        color: #737F90;
        font-size: 24px;
        font-weight: 600;
      }
      .login-tips-text-box{
        margin-right: 10px;
        padding: 10px;
        font-size: 16px;
      }
      .login-tips-text-box span{
        margin-right: 5px;
        cursor: pointer;
      }
      .navigation-box{
        margin-right: 10px;
        padding: 10px;
      }
      .navigation-box span:hover,.login-tips-text-box span:hover{
        color: orangered;
      }
      .navigation-box span{
        margin-right: 40px;
        color:#737F90;
        font-size:18px ;
        cursor: pointer;
      }
      .navigation-box i{
        font-size: 20px;
        font-weight: 600;
      }
    .blog-footer{
      margin-top: 10px;
      line-height: 30px;
      text-align: center;
      color: #909090;
    }
    #g-to-top{
      position: fixed;
      right: 100px;
      bottom: 10px;
      text-align: center;
      cursor: pointer;
      border:1px solid #8A8A8A;
      padding: 0px 5px 0px 5px;
    }
    #g-to-top .el-icon-caret-top{
    font-size: 30px;
  }

  .clear-fix{
    overflow: hidden;
    zoom:1;
  }
  .float-right{
    float: right;
  }
  .float-left{
    float: left;
  }
  .default-border-radius{
    border-radius: 5px;
  }
  a{
    text-decoration: none;
    color: #222222;
  }
  body{
    background: #F2F2FA;
  }














</style>
