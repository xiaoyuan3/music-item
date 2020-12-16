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
  name: "m-header"
}
</script>

<style lang="less" scoped>
#m-header{
  display: flex;

  height: 49px;
  width: 100%;

  background-color: #D44439;

  .left-header{
    width: 49px;
    span{
      color: #fff;
      font-size: 25px;
      margin-left: 12px;
      line-height: 49px;
    }
    // background-color: antiquewhite;
  }
  
  .centre-header{
    flex: 1;

    text-align: center;
    line-height: 49px;
    span{
      color: #fff;
      font-weight:600;
    }
    // background-color: #f00;
  }

  .right-header{
    width: 49px;
    // background-color: aquamarine;

    span{
      color: #fff;
      font-size: 25px;
      margin-left: 12px;
      line-height: 49px;
    }
  }


}
</style>