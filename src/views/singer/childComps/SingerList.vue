<template>
  <div class="singerlist">
    <div v-for="(item, index) in artists" :key="index" class="x">
      <a :href="item.picUrl">
        <img :src="item.img1v1Url" alt="" />
        <span>{{ item.name }}</span>
      </a>
    </div>
    <div class="alphabet">
      <p>热 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingList",
  props: {
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.singerlist {
  position: relative;
  .x {
    margin: 6px;
    border-bottom: 1px solid #e1e2e2;
    overflow: hidden;
    img {
      float: left;
      width: 80px;
      height: 80px;
      padding-bottom: 6px;
      border-radius: 15px;
      // border-bottom: 1px solid #000;
    }
    span {
      float: left;
      margin-top: 35px;
      margin-left: 15px;
      color: #000;
    }
  }
  .alphabet {
    // position: absolute;
    top: 0;
    font-size: 12px;
    
    
  }
}
</style>