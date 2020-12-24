<template>
  <div class="list">
    <!-- <h2>你好</h2> -->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <p class="fixed-title">{{ fixedTitle }}</p>
    </div>
    <scroll @scroll="scroll" class="list-content" ref="scroll">
      <list-view ref="listView" :artists="artists"></list-view>
    </scroll>
    <div
      @click="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul class="list-new" ref="pop">
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="index"
          class="list-point"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
let pinyin = require("js-pinyin");
import Scroll from "components/common/scroll/Scroll";
import ListView from "./listView/ListView";
import { getList } from "network/list";
import { getData } from "assets/js/list";

const HOT_LENGTH = 10;
const HOT_NAME = "热门歌手";
const TITLE_HEIGHT = 26;
export default {
  components: {
    ListView,
    Scroll,
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      artists: [],
      current2: false,
      diff: -1,
    };
  },
  created() {
    this.getList();
    this.touch = {};
    this.listHeight = [];
  },
  methods: {
    // 触摸事件
    onShortcutTouchStart(e) {
      // console.log(e.target);
      console.log(e);
      let anchorIndex = getData(e.target, "index");

      // console.log(e);
      // console.log(anchorIndex);

      // console.log(listView.$refs.listGroup[anchorIndex]);
      this._scrollTo(anchorIndex);
      this.scrollY = -this.listHeight[anchorIndex];
    },
    getList() {
      getList(100, 1).then((res) => {
        this.artists = this._normalList(res.artists);
        // console.log();
        // console.log(this.artists);
      });
    },
    scroll(pos) {
      this.scrollY = pos.y;
      // console.log(this.scrollY);
    },
    _scrollTo(index) {
      // console.log(index);
      // this.currentIndex = this.listHeight[index]
      // console.log(this.listHeight[index]);
      let listView = this.$refs.listView;
      this.$refs.scroll.scrollToElement(listView.$refs.listGroup[index]);
    },
    _calculateHeight() {
      this.listHeight = [];
      const listView = this.$refs.listView;
      const list = listView.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      // console.log(this.listHeight);
    },
    _normalList(artists) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      // 对数据进行遍历
      artists.forEach((item, index) => {
        item.FIndex = pinyin.getCamelChars(item.name[0]).toUpperCase();
        // console.log(pinyin.getCamelChars(item.name[0]));
        // 添加10名热门歌手到map的items中
        if (index < HOT_LENGTH) {
          map.hot.items.push({
            name: item.name,
            id: item.id,
            picUrl: item.picUrl,
          });
        }
        // 在map中添加一个新方法key
        var key = item.FIndex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          };
        }
        map[key].items.push({
          name: item.name,
          id: item.id,
          picUrl: item.picUrl,
        });
      });
      let ret = [];
      let hot = [];
      // console.log(key);
      // let key = map.title
      for (let key in map) {
        // console.log(key);
        // console.log(map[key]);
        let val = map[key];
        // console.log(val);
        // console.log(map);
        // console.log(map[key]);
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
          // console.log(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
  },
  watch: {
    scrollY(newval) {
      // console.log('xx');
      this._calculateHeight();
      const listHeight = this.listHeight;
      if (newval > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        // console.log(height1);
        let height2 = listHeight[i + 1];
        // console.log(listHeight[i]);
        if (-newval >= height1 && -newval < height2) {
          this.currentIndex = i;
          this.diff = height2 + newval + 1;
          // console.log(this.currentIndex);
          console.log(i);
          return;
        }
      }
      // 当滚动到底部， 且newval大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newval) {
      let fixedTop =newval > 0 && newval < TITLE_HEIGHT ? newval - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    },
  },
  computed: {
    shortcutList() {
      return this.artists.map((group) => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      console.log(this.artists);
      return this.artists[this.currentIndex]
        ? this.artists[this.currentIndex].title
        : "";
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list {
  position: relative;
  .list-content {
    position: absolute;
    top: 78px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .list-new {
    // position: absolute;
    // top: 50%;
    // right: 5px;
    position: absolute;
    z-index: 9;
    right: 0;
    top: 150px;
    width: 30px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    .list-point {
      padding: 3px;
      line-height: 1;
      font-size: 12px;
    }
    .current {
      color: red;
    }
  }
  .list-fixed {
    position: fixed;
    top: 66px;
    left: 0;
    right: 0;
    z-index: 9;
    // height: 26px;
    .fixed-title {
      // height: 26px;
      font-size: 12px;
      // line-height: 26px;
      // margin: 5px 0 5px 15px;
      padding: 5px 0 5px 15px;
      background-color: #f8f8f8;
      color: #606060;
    }
  }
}
</style>