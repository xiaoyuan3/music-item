<template>
  <div id="m-header">
    <!-- 左边图标 -->
    <div class="left-header">
      <span class="iconfont iconlist"></span>
    </div>
    <!-- 中间字体 -->
    <div class="centre-header">
      <span>V M U S I C J I N</span>
    </div>
    <!-- 右边图标 -->
    <div class="right-header">
      <span class="iconfont iconzu"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "m-header",
};
</script>

<style lang="less" scoped>
#m-header {
  position: fixed;
  display: flex;
  top: 0;
  height: 49px;
  width: 100%;
  z-index: 1;
  background-color: #d44439;
  .left-header {
    width: 49px;
    span {
      margin-left: 12px;
      font-size: 25px;
      line-height: 49px;
      color: #fff;
    }
  }
  .centre-header {
    flex: 1;
    text-align: center;
    line-height: 49px;
    span {
      font-weight: 600;
      color: #fff;
    }
  }
  .right-header {
    width: 49px;
    span {
      margin-left: 12px;
      line-height: 49px;
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>