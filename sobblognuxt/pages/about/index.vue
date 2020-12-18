<template>
  <div class="container clear-fix" style="background: #FFFFFF; margin-top: 20px">
    <div id="about-box" class="about-box" >
      <div id="about-box-left" class="about-box-left float-left">
        <el-tabs tab-position="left" v-model="select"  @tab-click="handleClick(select)">
          <el-tab-pane name="关于黄豆芽" label="关于黄豆芽"></el-tab-pane>
          <el-tab-pane name="我们的使命" label="我们的使命" ></el-tab-pane>
          <el-tab-pane name="我们的愿景" label="我们的愿景"></el-tab-pane>
          <el-tab-pane name="联系我们" label="联系我们"></el-tab-pane>
        </el-tabs>
      </div>
      <div id="about-box-right" class="about-box-right float-left">
        <div class="about-box-right-content">
          <div class="about-item">
            <h1>
              关于黄豆芽
            </h1>
            <p>
              黄豆芽创立于2020年3月12日，那是一个阳光明媚的下午。我正在家里吃午饭，然后看到厨房没烹饪的黄豆芽，于是黄豆芽博客创立。黄豆芽是一个知识分享的暂时无盈利的社区网站。 你可以在这里学习，你可以遇到志同道合的人，收获知识、经验与同性朋友。
            </p>
          </div>
          <div class="about-item">
            <h1>
              我们的使命
            </h1>
            <p>
              让学习编程变得更加简单。
            </p>
          </div>
          <div class="about-item">
            <h1>我们的愿景</h1>
            <p>让每一个热爱编程的年轻人成为优秀的程序员。</p>
          </div>
          <div class="about-item">
            <h1>
              联系我们
            </h1>
            <p>
              广告投放 ad@sunofbeach.net(仅作演示)
              <br>
              商务合作 bd@sunofbeach.net(仅作演示)
              <br>
              内容投诉 rp@sunofbeach.net(仅作演示)
            </p>
            <img src="http://47.103.216.205:2020/admin/image/1606179440585_780718689321222144.jpg" style="width: 90%">
          </div>
        </div>

      </div>
    </div>

  </div>


</template>

<script>
export default {
  data(){
    return{
      select:'关于黄豆芽'
    }
  },
  mounted() {

    let that=this;
    window.onresize=function () {
      that.onWindowScroll()
    }
    // 监听滑动
    window.addEventListener('scroll',this.onWindowScroll)

  },
  beforeDestroy() {

    window.removeEventListener('scroll',this.onWindowScroll);
  },
  methods: {
    handleClick(select){


      let parentPart=document.getElementById('about-box');
      if(select==='关于黄豆芽'){
        document.documentElement.scrollTop=112
      }else if(select==='我们的使命'){
        document.documentElement.scrollTop=320
      }else if(select==='我们的愿景'){
        document.documentElement.scrollTop=483
      }else if(select==='联系我们'){
        document.documentElement.scrollTop=640
      }
    },
    onWindowScroll(){
      let scrolledTop=document.documentElement.scrollTop;
      let scrolledLeft=document.documentElement.scrollLeft;
      let rightPart=document.getElementById('about-box-right');
      let leftPart=document.getElementById('about-box-left');
      let parentPart=document.getElementById('about-box');
      console.log(scrolledTop)
      if(rightPart||leftPart){
        let baseTop=rightPart.offsetTop;
        if(scrolledTop<baseTop){
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



      if(scrolledTop>0&&scrolledTop<264){
        this.select='关于黄豆芽'
      }else if(scrolledTop>265&&scrolledTop<415){
        this.select='我们的使命'
      }else if(scrolledTop>416&&scrolledTop<570){
        this.select='我们的愿景'
      }else if(scrolledTop>571&&scrolledTop<640){
        this.select='联系我们'
      }
    }
  }


}
</script>

<style>
  #about-box-left{
    position: fixed;

  }
  .container{
    background: #FFFFFF;
    margin-top: 20px;
    border-radius: 5px;
  }
  .about-box-left .el-tabs__item.is-active {
    color: #a612ff;
    font-size: 18px;
    font-weight: 600;
    transition: all .3s;
  }
  .about-box{
    margin-top: 20px;
    background: #FFFFFF;
  }
  .about-box-left{
    padding: 10px 0;

    width: 240px;
    /*height: 300px;*/
    margin-right: 20px;

  }
  .about-box-left .el-tabs__nav{
    margin-right: 83px;
  }
  .about-box-left .el-tabs__active-bar{
    background-color: rgba(0,0,0,0);
  }
  .about-box-left .el-tabs__item{
    padding: 63px 44px;
    font-size: 16px;
    height: 65px;
    border-right: 1px dashed;
    width: 210px;
  }
  .about-box-left .el-tabs__item.is-active::after{
    content: " ";
    display: inline-block;
    position: absolute;
    right: -20px;
    width: 27px;
    height: 27px;
    border: 6px solid #a612ff;
    border-radius: 50%;

    transform: scale(.5);
  }
  .about-box-right{
    width: 920px;
    margin-left: 250px;

  }
  .about-box-right-content{
    padding: 40px 110px 20px 20px;
  }
  .about-item{
    margin-top: 5px;
    margin-bottom: 80px;
    line-height: 30px;
    font-size: 16px;
  }
  .about-item h1{
    color: #737f90;
    font-size: 24px;
    font-weight: 600
  }
</style>
