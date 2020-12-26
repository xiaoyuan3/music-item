<template>
  <div>
    <ul>
      <li v-for="(item1, index) in list.name" :key="index">
        {{item1}}
        <ul>
          <li v-for="(item2, key) in songs.name" :key="key">{{item2}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    list: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  

};
</script>

<style lang="less" scoped>
</style>