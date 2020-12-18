<template>
  <div class="singerlist">
    <div v-for="(item, index) in artists" :key="index" class="x">
      <a :href="item.picUrl">
        <img v-lazy="item.img1v1Url" alt="" />
        <span>{{ item.name }}</span>
      </a>
    </div>
    <div class="alphabet">
      <p>
        <a href="">热</a> <br />
        <a href="">A</a> <br />
        <a href="">B</a> <br />
        <a href="">C</a> <br />
        <a href="">D</a> <br />
        <a href="">E</a> <br />
        <a href="">F</a> <br />
        <a href="">G</a> <br />
        <a href="">H</a> <br />
        <a href="">I</a> <br />
        <a href="">J</a> <br />
        <a href="">K</a> <br />
        <a href="">L</a> <br />
        <a href="">M</a> <br />
        <a href="">N</a> <br />
        <a href="">O</a> <br />
        <a href="">P</a> <br />
        <a href="">Q</a> <br />
        <a href="">R</a> <br />
        <a href="">S</a> <br />
        <a href="">T</a> <br />
        <a href="">U</a> <br />
        <a href="">V</a> <br />
        <a href="">W</a> <br />
        <a href="">X</a> <br />
        <a href="">Y</a> <br />
        <a href="">Z</a>
      </p>
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
  methods:{
    
  }
};
</script>

<style lang="less" scoped>
.singerlist {
  // position: relative;
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
    position: fixed;
    // top: 39px;
    top: 0;
    right: 10px;
    font-size: 12px;
    text-align: center;
    p {
      line-height: 19px;
      a {
        text-decoration: none;
        color: #78777a;
      }
    }
  }
}
</style>