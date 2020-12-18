<template>
  <div id="always-used-cards" class="always-used-cards " style="background: #FFffff">
    <div class="title">
      <span >热门卡片</span>
    </div>
    <div class="label-list-box" style="height: 200px;">
      <client-only>
        <wordcloud
          :data="defaultWords"
          nameKey="name"
          valueKey="count"
          :margin="margin"
          :fontSize="fontSize"
          :rotate="rotate"
          :showTooltip="false"
          :wordClick="wordClickHandler">
        </wordcloud>
      </client-only>
    </div>
  </div>
</template>
<script>
  import * as api from "../api/api";

  export default {
    data(){
      return{
        margin:{top: 0, right: 0, bottom: 0, left: 0 },
        rotate:{from: -20, to: 40, numOfOrientation: 8 },
        fontSize:[20, 50],
        wordPadding:3,
        defaultWords: [],
      }
    },
    methods:{
      wordClickHandler(name, value, vm) {

        // location.target="_blank";
        location.href='/search?keyword='+name
      },
      listLebel(){
        api.listLabel(8).then(result=>{
          if(result.code===20000){
            this.defaultWords=result.data.content
          }
        })
      },
    },
    mounted() {
      this.listLebel()
    }
  }
</script>


<style >
  .always-used-cards .title{
    font-size: 15px;
    color: #8A8A8A;
    padding: 5px;
  }
  .label-list-box .wordCloud{
    height: 200px;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
