<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent="progressTouchStarst"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from "assets/js/dom";
const progressBtnWidth = 16;

const transform = prefixStyle("transform");
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.touch = {}
  },
  methods:{
    progressTouchStarst(e) {
      console.log(e);
      this.touch.initiated = true
      this.touch.startX = e.changedTouches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
      // console.log('xx');
    },
    progressTouchMove(e) {
      if(!this.touch.initiated) {
        return
      }
      console.log(e);
      const delateX = e.changedTouches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + delateX))
      this._offset(offsetWidth)
      // console.log('bb');
    },
    progressTouchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick(e){
      this._offset(e.offsetX)
      this._triggerPercent()
    },
    _triggerPercent(){
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit("percentChange", percent)
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    },
  },
  watch: {
    percent(newval) {  //newval = this.currentTime / this.lastTime  在play组件中
      if (newval >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        // console.log(barWidth);
        const offsetWidth = newval * barWidth;
        // console.log(offsetWidth);
        this._offset(offsetWidth)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: rgb(255, 253, 253);
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid red;
        border-radius: 50%;
        background-color: gold;
      }
    }
  }
}
</style>