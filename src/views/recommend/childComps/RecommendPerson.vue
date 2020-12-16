<template>
  <div>
    <div class="person-w">推荐歌单</div>
    <div class="item-p">
      <div v-for="(item, index) in result" :key="index" class="item-d">
        <a href="">
          <img :src="item.picUrl" alt="" />
          <span>
            {{(item.playCount/10000).toFixed(1)}}万</span>
          <p>{{ item.name }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendPerson",
  props: {
    result: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.person-w {
  margin: 10px 5px;
  font-size: 14px;
  font-weight: 600;
  color: #000;
}
.item-p {
  display: flex;
  // flex-wrap: wrap;
  flex-flow: row wrap;
  // justify-content: space-around;
  // margin-left: 3px;
  width: 100%;
  .item-d {
    flex: 1;
    position: relative;
    width: 100%;
    // justify-content: space-between;
    margin: 8px 0;
    text-align: left;
    a {
      text-decoration: none;
      margin: 0 3px;
      img {
        width: 120px;
        height: 120px;
        border-radius: 3px;
      }
      span{
        position: absolute;
        background: url(~assets/image/RecommendPersonImage/ej.svg);
        // 指定背景图像的大小
        background-size: 11px 10px;
        // 图片是否重复
        background-repeat: no-repeat;
        margin: 2px 0;
        // 定位背景图像
        background-position:0;
        padding-left: 13px;
        right: 5px;
        font-size: 12px;
        color: #fff;
      }
      p {
        width: 100px;
        color: #6d6d6f;
        font-size: 12px;
        margin: 0;
        text-align: left;
        display: inline-block;
      }
    }
  }
}
</style>