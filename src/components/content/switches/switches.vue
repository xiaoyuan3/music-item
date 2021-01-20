<template>
  <ul class="switches">
    <li class="switch-item" 
    v-for="(item, index) in switches" 
    :key="index"
    :class="{'active':currentIndex === index}"
    @click="selectItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: [],
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  methods:{
    selectItem(index){
      this.$emit('switch', index)
    }
  }
};
</script>

<style lang="less" scoped>
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid #ffffff;
  border-radius: 5px;
  
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: 12px;
    color: rgb(177, 176, 176);
  }
  .active{
    background-color: rgb(174, 174, 174);
    color: #fff;
  }
}
</style>