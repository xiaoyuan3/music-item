<template>
  <div class="player" v-show="playlist.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.image" alt="" />
      </div>
      <div class="top">
        <div class="back">
          <i class="iconfont iconlower"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="singer.name"></h2>
      </div>
      <div class="center">
        <div>
          <div>
            <div class="e1-image">
              <img src="~assets/image/BFQ/e1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="left-left">
            <i class="iconfont iconloop"></i>
          </div>
          <div>
            <i class="iconfont icon7"></i>
          </div>
          <div class="i-center">
            <i class="iconfont iconplay"></i>
          </div>
          <div>
            <i class="iconfont icon5"></i>
          </div>
          <div>
            <i class="iconfont iconiconhomecollection_"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["playlist", "fullScreen", "currentSong", "singer"]),
  },
  created() {
    console.log(this.currentSong);
    console.log(this.playlist);
    console.log(this.fullScreen);
    console.log(this.singer);
  },
};
</script>

<style lang="less" scoped>
.player {
  margin: 0;
  padding: 0;
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 199;
    background-color: #fff;
    .background {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
    .top {
      position: relative;
      padding: 0;
      margin: 0;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        
      }
      .title {
        width: 70%;
        margin: 0 auto;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
      }
      .subtitle {
        margin: 0;
        line-height: 15px;
        text-align: center;
        font-size: 15px;
      }
    }
    .center {
      .e1-image {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%);
        img {
          width: 250px;
          height: 250px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        // margin: 0 20px;
        .iconfont {
          flex: 1;
        }
        i {
          font-size: 40px;
        }
        .i-center {
          i {
            font-size: 50px;
          }
        }
      }
    }
  }
}
</style>