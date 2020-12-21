<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    // probeType 有4个值
    // 0, 1 都是不侦测实时的位置
    // 2 ：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测
    // 3： 在只要是滚动，都侦测
    probeType: {
      type: Number,
      default: 3,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
      pullingUpOver: false,
    };
  },
  created() {
    // this.$nextTick(() => {
    //   // 执行滚动方法
    //   this.initScroll();
    // });
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollbar: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 监听scroll滚动到底部  pullingUp 上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 判断是否需要加载
        if (!this.pullingUpOver) {
          this.$emit("pullingUp");
        }
      });
    }
  },
  methods: {
    refresh() {
      // console.log('---');
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    closePullUp() {
      this.scroll && this.scroll.closePullUp();
    },
  },
};
</script>

<style lang="less" scoped>
</style>