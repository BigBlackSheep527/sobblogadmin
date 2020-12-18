<template>
    <div class="taoao-loop-list" style="background: #FFFFFF">
      <div style="margin-bottom: 5px ;color: #8A8A8A;margin-left: 5px">广告:</div>
      <el-carousel :interval="3000" arrow="always" >
        <el-carousel-item v-for="(item,index) in loop" :key="index">
          <a :href="item.coupon_click_url" >
            <img :src="item.pict_url+'_320x320xzq90.jpg_.webp'" sytle="object-fit:cover">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
</template>
<script>
  import * as api from '../api/api'
  export default {
    data(){
      return{
        loop:[]
      }
    },
    methods:{
      getTaobaoLoop(){
        api.getTaobaoLoop().then(result=>{
          if(result.code===10000){
            this.loop=result.data.tbk_dg_optimus_material_response.result_list.map_data;
            console.log(this.loop.pict_url)
          }else {
            this.$message.error(result.message)
          }
        })
      }
    },
    mounted() {
      this.getTaobaoLoop();
    }

  }
</script>


<style >
  .taoao-loop-list img{
    width:230px;
    height: 230px;
  }
  .taoao-loop-list .el-carousel__container{
    width:230px;
    height: 230px;
  }

  .taoao-loop-list .el-carousel__button{
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: wheat;
  }
</style>
