<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="(item,index) in searches" :key="index">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont icondelate"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    searches: {
      type:Array,
      default:[]
    }
  },
  methods:{
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style lang="less" scoped>
ul{
  margin: 0;
  padding: 0;
}
.search-list{
  .search-item{
    display: flex;
    height: 40px;
    align-items: center;
    overflow: hidden;
    &.list-enter-active, &.list-leave-active{
      transition: all .1s;
    }
    &.list-enter, &.list-leave-to{
      height: 0;
    }
    .text{
      flex: 1;
    }
  }
}
</style>