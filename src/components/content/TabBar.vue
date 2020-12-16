<template>
  <div class="tab-bar">
    <!-- 具体传入一个值的时候不需要加v-bind  如path -->
    <tab-bar-item path="/recommend" class="left">
      <div slot="item-text">推荐</div>
    </tab-bar-item>
    <tab-bar-item path="/row" class="center">
      <div slot="item-text">排行</div>
    </tab-bar-item>
    <tab-bar-item path="/singer" class="right">
      <div slot="item-text">歌手</div>
    </tab-bar-item>
  </div>  
</template>

<script>
import TabBar from './TabBarItem' 
import TabBarItem from './TabBarItem.vue'

export default {
  components: { TabBarItem },
  name:"TabBar",
  componentes: {
    TabBarItem
  }
}
</script>

<style lang="less" scoped>
.tab-bar{
  display: flex;
  height: 30px;
  background-color:  #D44439;
  text-align: center;
  
  
}
</style>