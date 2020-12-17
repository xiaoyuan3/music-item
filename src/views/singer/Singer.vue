<template>
  <div class="singer">
    <scroll class="sing-content">
      <singer-list :artists="artists"></singer-list>
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
    this.getSingerList();
  },
  methods: {
    getSingerList() {
      getSingerList().then((res) => {
        console.log(res);
        this.artists = res.artists;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sing-content{
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>