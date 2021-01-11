<template>
  <div class="search-box">
    <span class="iconfont iconzu"></span>
    <input class="box" v-model="query" :placeholder="placeholder" />
    <i @click="clear" v-show="query" class="iconfont icondelate"></i>
  </div>
</template>

<script>
export default {
  props:{
    placeholder:{
      type:String,
      default: ''
    }
  },
  data() {
    return {
      query:""
    }
  },
  methods:{
    clear(){
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    }
  },
  created() {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background-color: gray;
  // border-radius: 6px;
  span{
    font-size: 24px;
    color: #fff;
    
  }
  .box {
    flex: 1;
    margin: 0 8px;
    // margin-right: 16px;
    line-height: 22px;
    border-radius: 6px;
    outline: none;
    color: #8e8e94;
  }
  i{
    width: 24px;
    margin-right:5px;
    font-size: 18px;
  }
}
</style>