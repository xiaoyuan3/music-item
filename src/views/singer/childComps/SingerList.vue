<template>
  <div class="singerlist">
    <div class="singer-list-header">
      <div class="singer-list-header-above">
        <span
          :class="{ isShow: index === current }"
          v-for="(item, index) in titles"
          :key="index"
          @click="aboveClick(index)"
          >{{ item }}</span
        >
      </div>
      <div class="singer-list-header-under">
        <span
          class="unders"
          :class="{ isShow: index === currentUder }"
          v-for="(item, index) in unders"
          :key="index"
          @click="underClick(index)"
          >{{ item }}</span
        >
      </div>
    </div>
    <!-- <div v-show="!headShow" class="head-list"></div> -->
    <div class="singer-list-singer" >热门歌手</div>
    <div
      @click="selectItem(item)"
      v-for="(item, index) in artists"
      :key="index"
      class="x"
    >
      <!-- <a :href="null"> -->
      <img v-lazy="item.img1v1Url" alt="" />
      <span>{{ item.name }}</span>
      <!-- </a> -->
    </div>
    <!-- <div class="alphabet">
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
    </div> -->
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
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    unders: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // headShow:true,
      current: "",
      currentUder: "",
    };
  },
  created() {
    // this.getCurrent();
  },
  computed: {},
  methods: {
    // 点击事件 使用的vuex 储存数据歌手的id
    selectItem(item) {
      this.$emit("select", item);
      this.$router.push(`/singer/${item.id}`);
      // this.$router.push('artist'+ this.artists.accountId)
      // this.$router.push({
      //   path:'detail',
      //   query:{id:123}
      // })
    },
    // 华语 欧美 日本 韩国 其他 歌手国籍的点击事件
    aboveClick(index) {
      if (this.currentUder === "") {
        this.currentUder = 0;
      }
      this.current = index;

      this.$emit("aboveClick", index);
      // this.titles[index].isShow = true
      console.log(index);
    },
    // 歌手性别的点击事件
    underClick(index) {
      if (this.current === "") {
        this.current = 0;
      }
      this.currentUder = index;

      // this.current = 0;
      this.$emit("underClick", index);
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
.singerlist {
  position: relative;
  .singer-list-header {
    .singer-list-header-above,
    .singer-list-header-under {
      padding: 0 0 0 2px;
      margin: 5px 0;

      span {
        display: inline-block;
        height: 20px;
        width: 40px;
        line-height: 20px;
        padding: 6px 10px 0 10px;
        font-size: 13px;
        color: #606060;
      }
      .unders:last-child {
        display: inline-block;
        height: 20px;
        width: 80px;
      }
      .isShow {
        color: red;
      }
    }
  }
  // .head-list{
  //   position: absolute!important;
  //   height: 26px;
  //   width: 100%;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   z-index: 11;
  //   background-color: red;
  // }

  .singer-list-singer {
    margin-bottom: 5px;
    padding: 0 10px;
    font-size: 12px;
    padding: 5px 0 5px 10px;
    background-color: #f8f8f8;
    color: #606060;
    // margin: 0 0 10px 0;
    
  }
  .x {
    // position: fixed;
    margin: 6px 6px 6px 10px;
    border-bottom: 1px solid #e1e2e2;
    overflow: hidden;
    img {
      float: left;
      width: 60px;
      height: 60px;
      padding-bottom: 6px;
      border-radius: 50%;
      // border-bottom: 1px solid #000;
    }
    span {
      float: left;
      margin-top: 22px;
      margin-left: 15px;
      font-size: 13px;
      color: #000;
    }
  }
  /*
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
  */
}
</style>