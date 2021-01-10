<template>
  <div class="rank">
    <scroll class="toplist" ref="toplist">
    <ul>
      <li
        @click="select(item)"
        class="item"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="icon">
          <img width="100" height="100" v-lazy="item.coverImgUrl" />
        </div>
        <ul class="songlist">
          <li class="song" v-for="(items, index) in item.tracks" :key="index">
            <span>{{ index + 1 }} </span>
            <span>{{ items.first }}-{{ items.second }}</span>
          </li>
        </ul>
      </li>
    </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
export default {
  name: "RankNews",
  components:{
    Scroll
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    songList1: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    console.log(this.songList1);
    setTimeout(() => {
      this.$refs.toplist.refresh()
    }, 20);
  },
  methods:{
    select(item){
      this.$emit("selectItem", item)
    }
  },
  computed: {},
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rank {
  position: fixed;
  width: 100%;
  height: calc(100% - 60);
  top: 0;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.7);
        font-size: 12px;
      }
      .song {
        flex-wrap: nowrap;
        line-height: 26px;
      }
    }
  }
}
</style>