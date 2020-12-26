<template>
  <div @click="itemClick()" id="tab-bar-item">
    <div class="bgColor" :class="{ active: isActive }">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed: {
    isActive() {
      // this.$route.path当前路由  indexOf(this.path)查找是否为当前的路径 如果不是当前路径则返回-1
      return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="less" scoped>
#tab-bar-item {
  flex: 1;
  padding: 0 25px;
  .active {
    // width: 40px;
    padding-bottom: 2px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    border-bottom: 2px solid #fff;
  }
  // .active span{
  //   border-bottom: 2px solid #000000;
  // }
}
.bgColor {
  color: rgba(208, 206, 206, 0.959);
}
</style>