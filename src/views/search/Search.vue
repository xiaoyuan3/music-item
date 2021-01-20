<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box :placeholder="placeholder" ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.searchWord)" class="item" v-for="(item, index) in hotKey" :key="index">
              <span>{{ item.searchWord }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icondelate2"></i>
            </span>
          </h1>
          <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <scroll class="scroll" v-show="query">
      <suggest @select="saveSearch" :query="query"></suggest>
    </scroll>
    <confirm ref="confirm" @confirm="clearSearchHistory" :text="textContent" :confirmBtnText="confirmText"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from "components/content/search-box/SearchBox";
import Suggest from "components/content/suggest/Suggest"
import Scroll from "components/common/scroll/Scroll";
import SearchList from "components/content/search-list/SearchList"
import Confirm from "components/common/confirm/Confirm"
import { getSearch, getHot } from "network/search";
import {mapActions, mapGetters} from 'vuex'
import {searchMixin} from 'assets/js/mixin'
export default {
  mixins:[searchMixin],
  components: {
    SearchBox,
    Suggest,
    Scroll,
    SearchList,
    Confirm
    // 搜索歌曲、歌手
  },
  data() {
    return {
      placeholder: "搜索歌曲、歌手",
      hotKey: [],
      textContent:'是否清空所有搜索历史',
      confirmText:"清空"
    };
  },
  created() {
    this.getHot();
    // this.getSearch();
  },
  methods: {
    getHot() {

      getHot().then((res) => {
        console.log(res);
        this.hotKey = res.data;
      });
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
}
</script>

<style lang="less" scoped>
template,ul,div {
  margin: 0;
  padding: 0;
}
.search {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  height: 100%;
  background-color: #fff;
  .shortcut-wrapper {
    position: fixed;
    top: 40px;
    bottom: 0;
    width: 100%;
    .shortcut {
      margin: 0 20px 20px 20px;
      .title {
        padding: 0;
        margin-bottom: 20px;
        font-size: 16px;
        color: #000;
      }
      .item {
        display: inline-block;
        padding: 3px 2px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background-color: rgb(213, 172, 172);
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .search-history{
      position: relative;
      .title{
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 16px;
        .text{
          flex: 1;
        }
      }
    }
  }
  .scroll{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>