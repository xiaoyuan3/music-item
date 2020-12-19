<template>
  <div class="singer-detail">
    <h2>我是详情页</h2>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDeail} from 'network/singer'
export default {
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.getSingerDeail()
  },
  computed:{
    ...mapGetters([
      'singer'
    ])
  },
  methods:{
    getSingerDeail(){
      getSingerDeail(this.singer.id).then(res => {
        console.log(res);
      })
    }
  }
};
</script>

<style lang="less" scoped>
.singer-detail {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
</style>