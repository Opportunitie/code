<template>
  <div class="main">
    <div id="line" class="line"></div>
  </div>
</template>

<script>
import * as Three from "three";
import { OrbitControls } from "three-orbit-controls";
export default {
  data() {
    return {
      // 场景
      scene: null,
      // 相机
      camera: null,
      // 物体对象
      mesh: null,
      // 渲染器
      renderer: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      let container = document.getElementById("line");

      this.renderer = new this.$Three.WebGLRenderer();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.scene = new this.$Three.Scene();

      this.camera = new this.$Three.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        500
      );
      this.camera.position.set(0, 0, 100);
      this.camera.lookAt(0, 0, 0);

      let material = new this.$Three.LineBasicMaterial({ color: "#fff" });
      let geometry = new this.$Three.Geometry();
      geometry.vertices.push(new this.$Three.Vector3(-10, 0, 0));
      geometry.vertices.push(new this.$Three.Vector3(0, 10, 0));
      geometry.vertices.push(new this.$Three.Vector3(10, 0, 0));
      let line = new this.$Three.Line( geometry, material );
      this.scene.add(line);
    },
    animate: function () {
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang='less' scoped>
.main {
  height: 100%;
  .line {
    height: 100%;
  }
}
</style>
