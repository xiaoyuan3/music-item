<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index" class="swiper-i">
      <a :href="item.url">
        <img :src="item.imageUrl" alt="" class="swiper-img" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    // imageLoad() {
    //   // 判断只监听一次 而不是4次
    //   if(!this.isLoad) {
    //     this.$emit('swiperImageLoad');
    //     this.isLoad = true;
    //   }
    // }
  },
};
</script>

<style lang="less" scoped>
.swiper-i {
  width: calc(100% - 0.2px);
}
</style>