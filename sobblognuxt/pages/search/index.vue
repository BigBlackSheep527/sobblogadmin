<template>
  <div class="container">
   搜索页面
    <div> 要搜索的内容key为：{{keyword}}，后端接口时间问题暂未开发</div>
  </div>
</template>

<script>
export default {
  asyncData({query}){

    return{
      keyword:query.keyword
    }
  }
}
</script>

<style>
</style>
