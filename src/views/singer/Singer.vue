<template>
  <div class="singer">
    <scroll class="sing-content" @scroll="contentScroll">
      <singer-list @select="selectSinger" :artists="artists"></singer-list>
      <router-view />
    </scroll>
  </div>
</template>

<script>
// 网络部分
import { getSingerList } from "network/singer";
// 公共组件
import Scroll from "components/common/scroll/Scroll";
// 子组件
import SingerList from "./childComps/SingerList";

export default {
  name: "Singer",
  components: {
    SingerList,
    Scroll,
  },
  data() {
    return {
      artists: [],
    };
  },
  created() {
    // 初始化 调用methods里的getSingerList
    this.getSingerList();
  },
  mounted() {},
  methods: {
    getSingerList() {
      // 歌手榜单接口返回的promise函数
      getSingerList().then((res) => {
        console.log(res.artists);
        this.artists = res.artists;
      });
    },
    // 监听滚动的y轴
    contentScroll(position) {
      console.log(position.y);
    },
    // 监听子元素SingerList发送来的点击事件
    selectSinger(singer) {
      this.$router.push({
        path: `/artist/detail?id=${singer.accountId}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sing-content {
  position: absolute;
  top: 79px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>