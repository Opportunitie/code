<template>
  <div class="main">
    <div id="container" class="container"></div>
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
      let container = document.getElementById("container");
      // 创建一个场景
      this.scene = new this.$Three.Scene();

      // 创建一个相机
      this.camera = new this.$Three.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      ); // 正交（orthographic） 透视（perspective）
      this.camera.position.z = 2; // 相机的位置 (positon: 控制相机在整个3D环境中的位置 , lookAt:控制相机的焦点位置，决定相机的朝向)
      // 建立一个物体对象
      let material = new this.$Three.MeshNormalMaterial()
      let geometry = new this.$Three.BoxGeometry(1, 1, 1);
      // let material = new this.$Three.MeshBasicMaterial();
      this.mesh = new this.$Three.Mesh(geometry, material);
      this.scene.add(this.mesh);
      // 创建一个渲染器
      this.renderer = new this.$Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      // 将渲染器放进dom中
      container.appendChild(this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang='less' scoped>
.main {
  height: 100%;
  .container {
    height: 100%;
  }
}
</style>
