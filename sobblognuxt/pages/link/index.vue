<template>
  <div class="link-container">
    <div class="link-content">
      <div class="list-linkCard-title">
        <span>友情链接</span>
      </div>
      <div class="link-card" v-for="(item,index) in friendLink" :key=index>
          <a :href="item.url">
            <img :src="item.logo" >
          </a>
        </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/api'
export default {
  data(){
    return{
      friendLink:[{
        url:'https://element.eleme.cn/#/zh-CN/component/tag',
        logo:'http://47.103.216.205:2020/portal/image/1605410829854_777494902253551616.jpg'
      }]
    }
  },
  methods:{
    listFriendLink(){
      api.getfriendLink().then(result=>{
        if(result.code===20000){
          this.friendLink=result.data;
        }
      })
    }
  },
  mounted() {
    this.listFriendLink()
  }
}
</script>

<style>
  .link-box{
    margin-top: 20px;
  }
  .list-linkCard-title {
    margin: 10px;
    text-align: center;
    font-weight: 600;
    font-size: 30px;
  }
  .link-content .link-card{
    margin-left: 30px;
    margin-top: 30px;
    display: inline-block;

  }
  .link-content .link-card :hover{
    box-shadow: 0 1px 10px #afafaf;
  }
  .link-card img{
    width: 170px ;
    height: 60px;
    padding: 5px;
    display:block;/*//去掉照片底边距*/
  }
  .link-content{
    margin: 20px;
  }
  .link-container{
    margin-top: 40px;
    padding: 10px;
    box-shadow: 0 1px 10px #afafaf;
  }
</style>
