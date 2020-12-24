<template>
  <div class="list-view">
    <ul class="list-view-ul1">
      <li
        v-for="group in artists"
        class="list-view-li1"
        ref="listGroup"
      >
        <p class="group-title">{{ group.title }}</p>
        <ul class="ul2">
          <li v-for="item in group.items" class="li2" @touchstart="touchstart">
            <img v-lazy="item.picUrl" alt="" />
            <span class="span">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <div>
      <ul class="list-new">
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          class="list-point"
          
        >
          {{ item }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
    letterPoint: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods(){
    this.pointt()
  },
  computed: {
    // 计算属性数据的调用
    // shortcutList() {
    //   return this.artists.map((group) => {
    //     return group.title.substr(0, 1);
    //   });
    // },
    
  },
  methods: {
    pointt() {
      this.artists.map(group => {
        this.letterPoint = group.title.substr(0, 1)
        console.log(this.letterPoint);
      })
    },
    touchstart(){
      // console.log('xx');
    }
    
  },
};
</script>

<style lang="less" scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-view {
  position: relative;
  overflow: hidden;
  // margin-top: 78px;
  // top: 64px;
  .list-view-ul1 {
    list-style: none;
    .group-title {
      width: 100%;
      // margin-bottom: 5px;
      margin: 0;
      // padding: 0 10px;
      font-size: 12px;
      padding: 5px 0 5px 15px;
      background-color: #f8f8f8;
      color: #606060;
    }
    .list-view-li1 {
      .ul2 {
        .li2 {
          display: flex;
          padding: 1px 0 1px 20px;
          img {
            width: 60px;
            height: 60px;

            border-bottom: none;
            border-radius: 50%;
            margin: 2px;
          }
          .span {
            margin: 25px 0 0 25px;
            display: inline-block;
            font-size: 13px;
            // padding: ;
          }
        }
      }
    }
  }
  .list-new {
    // position: absolute;
    // top: 50%;
    // right: 5px;
    position: absolute;
    z-index: 9;
    right: 0;
    top: 78px;
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    .list-point {
      padding: 3px;
      line-height: 1;
      font-size: 12px;
    }
  }
}
</style>