<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index" class="list1">
        <h1 class="h1">
          {{ item.name }}
        </h1>
        <ul>
          <li class="list2">{{ singer.name }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      name: String,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["singer"]),
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.list1 {
  margin: 20px 0;
  color: #000;

  .h1 {
    font-size: 14px;
    font-weight: normal;
  }
  .list2 {
    // padding: 0 30px;
    color: #adadae;
    font-size: 14px;
  }
}
</style>