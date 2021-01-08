<template>
  <div class="re">
    <div class="person-w">推荐歌单</div>
    <div class="item-p">
      <div
        @click="selectItem(item)"
        v-for="(item, index) in result"
        :key="index"
        class="item-d"
      >
        <img :src="item.picUrl" alt="" />
        <span>{{ (item.playCount / 10000).toFixed(1) }}万</span>
        <p>{{ item.name }}</p>
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
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
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
  width: 100%;
  // flex-flow: row wrap;
  justify-content: space-evenly;
  flex-flow: wrap;
  .item-d {
    flex: 1;
    position: relative;
    margin: 8px 0;
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
    span {
      position: absolute;
      background: url(~assets/image/RecommendPersonImage/ej.svg);
      // 指定背景图像的大小
      background-size: 11px 10px;
      // 图片是否重复
      background-repeat: no-repeat;
      margin: 2px 0;
      // 定位背景图像
      background-position: 0;
      padding-left: 13px;
      right: 5px;
      font-size: 12px;
      color: #fff;
    }
    p {
      // 显示两行多的用省略号代替 前5行代码
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      width: 100px;
      margin: 0 2px;
      font-size: 12px;
      text-align: left;
      color: #6d6d6f;
    }
  }
}
</style>