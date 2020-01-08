<template>
  <div class="BackgroundGL">
    <canvas class="BackgroundGL-canvas" ref="canvas">
      fallback
    </canvas>
  </div>
</template>

<script>
import Webgl from '@/components/backgroundGL/webgl/Webgl'
import loop from 'raf-loop'

export default {
  data () {
    return {
      engine: undefined
    }
  },
  computed: {

  },
  mounted () {
    this.webgl = new Webgl(this.$refs['canvas'])
    this.engine = loop(this.webgl.render)
    this.engine.start()
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    this.webgl.destroy()
    this.engine.stop()
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.webgl.onResize()
    }
  }
}
</script>

<style lang="stylus">
  .BackgroundGL
    width: 100%
    height: 100%
    position: fixed
    left: 0
    top: 0
    pointer-events: none
    user-select: none
    z-index: -1
    canvas
      width: 100%
      height: 100%
      left: 0
      top: 0
      position: absolute
</style>
