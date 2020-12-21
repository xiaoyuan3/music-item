<template>
  <div class="singer">
    <div :class="{ active: active }">
      {{ name }}<span v-show="pointShow">.</span>{{ sex }}
    </div>
    <div :class="{ host: active }">热门歌手</div>
    <scroll
      ref="scroll"
      class="sing-content"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <singer-list
        class="singer-list"
        ref="singerList"
        @select="selectSinger"
        :artists="artists"
        :titles="['华语', '欧美', '日本', '韩国', '其他']"
        :unders="['男', '女', '乐队/组合']"
        @aboveClick="aboveClick"
        @underClick="underClick"
      ></singer-list>
    </scroll>
    <div class="s">
      <div v-for="(item, index) in letterArr" :key="index" class="p">
        {{ item }}
      </div>
    </div>

    <router-view />
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
        limit: 30,
        offset: 1,
      },
      artists: [],
      active: false,
      // host:false
      name: "全部歌手",
      sex: "",
      pointShow: false,
      letterArr: ["热"],
      ret: ["-1"],
    };
  },
  created() {
    // 初始化 调用methods里的getSingerList
    this.getSingerList();
    this.getAZ();
  },
  mounted() {
    console.log(this.$refs.singerList.$el.offsetTop);
  },
  watch: {},
  methods: {
    // 头部国籍点击事件
    aboveClick(index) {
      var singerList = this.$refs.singerList;

      this.$refs.scroll.pullingUpOver = false;
      const currentUder = singerList.currentUder;
      if (index === 0 && currentUder === 0) {
        this.name = "华语";
        this.sex = "男";
        this.pointShow = true;
      } else {
        this.name = singerList.titles[index];
        this.sex = singerList.unders[currentUder];
        this.pointShow = true;
      }
      let area = this.singers.area;
      switch (index) {
        case 0:
          area = 7;
          break;
        case 1:
          area = 96;
          break;
        case 2:
          area = 8;
          break;
        case 3:
          area = 16;
          break;
        case 4:
          area = 0;
          break;
      }
      // 点击头部国籍 上拉加载更多
      this.getSingerList();
    },
    // 头部下面的性别点击事件
    underClick(index) {
      var singerList = this.$refs.singerList;

      this.$refs.scroll.pullingUpOver = false;
      const current = singerList.current;
      if (index === 0 && current === 0) {
        this.name = "华语";
        this.sex = "男";
        this.pointShow = true;
      } else {
        this.name = singerList.titles[current];
        this.sex = singerList.unders[index];
        this.pointShow = true;
      }
      var type = this.singers.type;
      switch (index) {
        case 0:
          type = 1;
          break;
        case 1:
          type = 2;
          break;
        case 2:
          type = 3;
          break;
      }
      // 点击头部性别 上拉加载更多
      this.getSingerList();
    },
    // 监听滚动的y轴  添加class属性active
    contentScroll(position) {
      // console.log(position.y);
      if (-position.y >= 40) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
    // 监听子元素SingerList发送来的点击事件
    selectSinger(singer) {
      this.setSinger(singer);
    },
    loadMore() {
      console.log("-------");
      this.getSingerList();
    },
    getSingerList() {
      // debugger
      // 歌手榜单接口返回的promise函数
      const { type, area, initial, offset, limit } = this.singers;
      getSingerList(type, area, initial, limit, offset).then((res) => {
        console.log(res);
        var scroll = this.$refs.scroll
        if (res.more === false) {
          scroll.finishPullUp();
          scroll.closePullUp();
          scroll.refresh();
          scroll.pullingUpOver = true;
          return;
        }
        // this.artists = res.artists;
        this.ret = res.initial;
        // console.log(ret);
        this.singers.offset += 30;
        this.artists.push(...res.artists);
        
        scroll.finishPullUp();
        scroll.refresh();
      });
    },
    getAZ() {
      for (let i = 65; i < 91; i++) {
        this.letterArr.push(String.fromCharCode(i));
      }
      console.log(this.letterArr);
    },
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
  },
};
</script>

<style lang="less" scoped>
.singer {
  height: 100%;
}
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
.singer-list {
  height: 100%;
}
.s {
  position: fixed;
  top: 188px;
  right: 5px;
  font-size: 12px;
  text-align: center;
  // font-weight: 200;
  color: #000;
  .p {
    margin: 1px;
  }
}
</style>