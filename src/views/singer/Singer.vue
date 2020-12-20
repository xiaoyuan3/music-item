<template>
  <div class="singer">
    <div :class="{ active: active }">{{ name }}.{{ sex }}</div>
    <div :class="{ host: active }">热门歌手</div>
    <scroll
      ref="scroll"
      class="sing-content"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <singer-list
        ref="singerList"
        @select="selectSinger"
        :artists="artists"
        :titles="['华语', '欧美', '日本', '韩国', '其他']"
        :unders="['男', '女', '乐队/组合']"
        @aboveClick="aboveClick"
        @underClick="underClick"
      ></singer-list>
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
// 传入数据
import { mapMutations } from "vuex";

export default {
  name: "Singer",
  components: {
    SingerList,
    Scroll,
  },
  data() {
    return {
      singers: {
        type: -1,
        area: -1,
        initial: "",
        // limit: [],
        // offset: 0,
      },
      artists: [],
      active: false,
      // host:false
      name: "全部歌手",
      sex: "",
    };
  },
  created() {
    // 初始化 调用methods里的getSingerList
    this.getSingerList();
  },
  mounted() {
    console.log(this.$refs.singerList.$el.offsetTop);
  },
  methods: {
    aboveClick(index) {
      console.log(this.$refs.singerList.titles);
      const currentUder = this.$refs.singerList.currentUder;
      console.log(currentUder);
      if (index === 0 && currentUder === 0 ) {
        this.name = "华语";
        this.sex = "男";
      } else {
        this.name = this.$refs.singerList.titles[index];
        this.sex = this.$refs.singerList.unders[currentUder]
      }
      switch (index) {
        case 0:
          this.singers.area = 7;
          break;
        case 1:
          this.singers.area = 96;
          break;
        case 2:
          this.singers.area = 8;
          break;
        case 3:
          this.singers.area = 16;
          break;
        case 4:
          this.singers.area = 0;
          break;
      }
      let type = this.singers.type;
      let area = this.singers.area;
      let initial = this.singers.initial;
      let limit = this.singers.limit;
      let offset = this.singers.offset;
      getSingerList(type, area, initial, limit, offset).then((res) => {
        console.log(res);
        this.artists = res.artists;
        // this.artists.push(...res.artists);
      });
    },
    underClick(index) {
      const current = this.$refs.singerList.current
      if (index === 0 && current === 0) {
        this.name = "华语";
        this.sex = "男";
      } else {
        this.name = this.$refs.singerList.titles[current]
        this.sex = this.$refs.singerList.unders[index];
      }
      switch (index) {
        case 0:
          this.singers.type = 1;
          break;
        case 1:
          this.singers.type = 2;
          break;
        case 2:
          this.singers.type = 3;
          break;
      }
      let type = this.singers.type;
      let area = this.singers.area;
      let initial = this.singers.initial;
      let limit = this.singers.limit;
      let offset = this.singers.offset;
      getSingerList(type, area, initial, limit, offset).then((res) => {
        console.log(res);
        this.artists = res.artists;
        // this.artists.push(...res.artists);
        // this.offset += 1
        this.$refs.scroll.finishPullUp();
      });
    },
    // 监听滚动的y轴
    contentScroll(position) {
      // console.log(position.y);
      if (position.y >> -40) {
        this.$refs.singerList.headShow = false;
        this.active = true;
      } else {
        this.$refs.singerList.headShow = true;
        this.active = false;
      }
    },
    // 监听子元素SingerList发送来的点击事件
    selectSinger(singer) {
      // this.$router.push({
      //   path: `/artist/detail?id=${singer.accountId}`,
      // console.log(singer);
      // });
      this.setSinger(singer);
    },
    loadMore() {
      // console.log('-------');
      this.getSingerList(this.singers);
    },
    getSingerList() {
      // 歌手榜单接口返回的promise函数
      let type = this.singers.type;
      let area = this.singers.area;
      let initial = this.singers.initial;
      let limit = this.singers.limit;
      let offset = this.singers.offset;
      getSingerList(type, area, initial, limit, offset).then((res) => {
        console.log(res);
        this.artists = res.artists;
        // this.artists.push(...res.artists);
        // this.offset += 1
        this.$refs.scroll.finishPullUp();
      });
    },
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
  },
};
</script>

<style lang="less" scoped>
.active {
  position: fixed;
  height: 26px;
  width: 100%;
  top: 78px;
  right: 0;
  left: 0;
  padding: 0 10px;
  font-size: 12px;
  line-height: 26px;
  color: #606060;
  background-color: #fff;
  z-index: 11;
}
.host {
  position: fixed;
  top: 104px;
  left: 0;
  right: 0;
  margin-bottom: 5px;
  padding: 0 10px;
  font-size: 12px;
  padding: 5px 0 5px 10px;
  background-color: #f8f8f8;
  color: #606060;
  z-index: 99;
  // margin: 0 0 10px 0;
}
.sing-content {
  position: absolute;
  top: 78px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>