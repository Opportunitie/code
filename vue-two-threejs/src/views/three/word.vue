<template>
  <div class="main">
    <div class="word" id="word"></div>
  </div>
</template>

<script>
import fontFamily from "three/examples/fonts/helvetiker_regular.typeface.json";
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
      console.log('1',fontFamily)
      const _this = this
      let container = document.getElementById("word");

      this.scene = new this.$Three.Scene();

      this.camera = new this.$Three.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 2.5, 4);
      // 光源
      let spotlight = new this.$Three.SpotLight(0xffffff);
      spotlight.position.set(-15, 10, 0);
      this.scene.add(spotlight);

      this.renderer = new this.$Three.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      let loader = new this.$Three.FontLoader();
      loader.load(fontFamily, function (font) {
        let geometry = new this.$Three.TextGeometry("Hello three.js!", {
          font: font,
          size: 0.5,
          height: 0.3,
          //   font: font,
          //   size: 80,
          //   height: 5,
          //   curveSegments: 12,
          //   bevelEnabled: true,
          //   bevelThickness: 10,
          //   bevelSize: 8,
          //   bevelSegments: 5,
        });
        let material_text=new this.$Three.MeshLambertMaterial({color:0x9933FF});
        let text_1=new this.$Three.Mesh(geometry, material_text);
        _this.scene.add(text_1);
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .word {
    height: 100%;
  }
}
</style>