<template>
<div>
  <div class="suggest" :data="result">
    <ul class="suggest-list" v-for="(item, index) in result" :key="index">
      <li class="suggest-item">
        <div class="icon">
          <i class="iconfont iconzu"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.name"></p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import { getSearch } from "network/search";
import Scroll from "components/common/scroll/Scroll";
export default {
  components:{
    Scroll
  },
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
      result: []
    }
  },
  created() {
    console.log(this.query);
  },
  methods: {
    search(){
      getSearch(this.query).then((res) => {
        console.log(res);
        this.result =res.result.songs
      });
    },
    // _normalizeSongs(list){
    //   list.forEach(e => {
    //   });
    // }
  },
  watch: {
    query(){
      this.search()
    }
  },
};
</script>

<style lang="less" scoped>
div,ul {
  padding: 0;
  margin: 0;
}
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      height: 35px;
      padding-bottom: 10px;
      align-items: center;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      i{
        font-size: 14px;
      }
    }
    .name {
      flex: 1;
      font-size: 12px;
      overflow: hidden;
      .text {
        flex-wrap: nowrap;
        // no-wrap()
      }
    }
  }
}
</style>