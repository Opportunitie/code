<template>
  <div class="main-video">
    <div class="line-one">
      <img id="1" :src="imgSrc1" width="700px" height="400px" />
      <img id="2" :src="imgSrc2" width="700px" height="400px" />
      <div></div>
    </div>
    <div class="line-two">
      <img id="3" :src="imgSrc3" width="700px" height="400px" />
      <img id="4" :src="imgSrc4" width="700px" height="400px" />
    </div>

    <!-- <img id='5' :src="imgSrc5" width="500px" height='400px' /> -->
    <!-- <img id='6' :src="imgSrc6" width="500px" height='400px' /> -->
  </div>
</template>

<script>
import WebSocketTest from "./webSocket";
export default {
  data() {
    return {
      imgSrc1: require("../../../assets/xianhe/clock.png"),
      imgSrc2: require("../../../assets/xianhe/clock.png"),
      imgSrc3: require("../../../assets/xianhe/clock.png"),
      imgSrc4: require("../../../assets/xianhe/clock.png"),
      // imgSrc5: require('../../../assets/xianhe/clock.png'),
      // imgSrc6: require('../../../assets/xianhe/clock.png'),
      arrWsTabOne: [],
      urlConfig:[
        "/rtsp/RTSP01", // 0
        "/rtsp/RTSP02", // 1
        "/rtsp/RTSP03", // 2
        "/rtsp/RTSP04", // 3
      ]
    };
  },
  mounted() {
    this.playVideoOne();
    // setTimeout(() => {
    //   console.log("this.arrWsTabOne[0].close()", this.arrWsTabOne[0].close());
    // }, 2000);
  },
  methods: {
    playVideoOne() {
      const _this = this;
      if (this.arrWsTabOne.length > 0) {
        this.arrWsTabOne.forEach((item) => {
          if (item) {
            item.close();
          }
        });
      }

      this.arrWsTabOne = [];
      WebSocketTest(this.urlConfig[0], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc1 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest(this.urlConfig[1], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc2 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest(this.urlConfig[2], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc3 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest(this.urlConfig[3], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc4 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
    },
    playVideoTwo() {
      const _this = this;
      if (this.arrWsTabOne.length > 0) {
        this.arrWsTabOne.forEach((item) => {
          if (item) {
            item.close();
          }
        });
      }

      this.arrWsTabOne = [];
      WebSocketTest(this.urlConfig[0], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc1 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest(this.urlConfig[1], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc2 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest("/rtsp/xxxx3", (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc3 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest("/rtsp/xxxx4", (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc4 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
    },
    playVideoThree() {
      const _this = this;
      if (this.arrWsTabOne.length > 0) {
        this.arrWsTabOne.forEach((item) => {
          if (item) {
            item.close();
          }
        });
      }

      this.arrWsTabOne = [];
      WebSocketTest(this.urlConfig[0], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc1 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest(this.urlConfig[1], (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc2 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest("/rtsp/xxxx3", (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc3 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
      WebSocketTest("/rtsp/xxxx4", (res, ws) => {
        try {
          _this.arrWsTabOne.push(ws);
          // const data = JSON.parse(res);
          this.imgSrc4 = `data:image/*;base64, ${res}`;
        } catch (e) {}
      });
    },
    
  },
};
</script>

<style lang="less" scoped>
.main-video {
  .line-one {
    > :nth-child(1) {
      margin-right: 20px;
    }
  }
  .line-two {
    > :nth-child(1) {
      margin-right: 20px;
    }
  }
}
</style>