<template>
  <div id="home">
    <BackgroundGL/>
    <div id="nameSection">
      <div id="mainPage">
        <h1>LUCAS <br>LAVALLEE</h1>
      </div>
    </div>
    <div id="selfDescription" ref="selfDescription">
      <img src="../assets/me.png" alt="Lucas Lavallée" id="mePhoto">
      <p>Je suis Lucas Lavallée, un étudiant en 3ème année de formation d'ingénieur à l'IMAC</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BackgroundGL from '@/components/backgroundGL/BackgroundGL.vue'
import {mapActions} from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'home',
  components: {
    BackgroundGL
  },
  data() {
    return {
      zoom: 0, 
      tl: null
    }
  },
  methods: {
    handleScroll (event) {
      const scrollPosition = window.scrollY
      const selfDPos = this.$refs.selfDescription.offsetTop
      console.log(scrollPosition, selfDPos)
      if(scrollPosition > 0) {
        //this.zoom = ((window.innerHeight + scrollPosition) * 100) / selfDPos
        this.updateHomeZoom(((window.innerHeight + scrollPosition) * 100) / selfDPos)
      }
      if(selfDPos / 1.2 < scrollPosition) {
        this.triggerAnimation()
      }
    },

    triggerAnimation() {
      this.tl = new TimelineMax({})

      this.tl.to("#mePhoto", {
        opacity: 1,
        duration: 0.4,
        x: 0
      })
    },
    ...mapActions([      
      'changeComponentLoaded',
      'updateHomeZoom'
    ])
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted(){
    this.changeComponentLoaded(true)
  }
}
</script>

<style lang="stylus">
  #nameSection 
    position relative
    height 100vh
    width 100%

  #selfDescription
    position relative
    min-height 100vh

  #mainPage
    display flex
    align-items center
    height 100%
    justify-content center

    h1
      font-size 4em

  #mePhoto
    opacity 0
    transform translateX(50px)
    width 400px
    height auto

</style>