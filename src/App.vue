<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/"  :event="''" @click.native.prevent="transitionOut('/','Home')"><img src="@/assets/logo.png" alt="logo" id="logo" ></router-link>
      </div>
      <div id="mobile_menu" class="menu">
        <img src="./assets/menu.png" alt="menuIcon" @click="openMobileMenu()">
      </div>
      <div id="menu" class="menu">
        <router-link to="/" :event="''" @click.native.prevent="transitionOut('/','Home')" class="routerLink">Home</router-link>
        <router-link to="/projects" :event="''" @click.native.prevent="transitionOut('/projects','Projects')" class="routerLink">Projects</router-link>
        <router-link to="/contact"  :event="''" @click.native.prevent="transitionOut('/contact', 'Contact')" class="routerLink">Send me something ... </router-link>

        <img src="./assets/leave.png" alt="menuIcon" @click="leaveMobileMenu()" id="leaveMobileMenu">
      </div>
    </div>
    <router-view/>
    <div id="transition">
      <div id="navigationChange" class="navigationChange">
        <h2 class="titleNav movingTitle" id="toTitle">{{this.navigation.to.name}}</h2>
        <h2 class="titleNav">{{this.navigation.to.name}}</h2>
      </div>

      <div id="navigationChange2" class="navigationChange">
        <h2 class="titleNav movingTitle" id="toTitle2">{{this.navigation.to.name}}</h2>
        <h2 class="titleNav">{{this.navigation.to.name}}</h2>
      </div>
      <div class="panTransition panTransition1"></div>
      <div class="panTransition panTransition2"></div>
      <div class="panTransition panTransition3"></div>
      <div class="panTransition panTransition4"></div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, Power1, Power3 } from 'gsap'
import {mapActions, mapGetters} from 'vuex'
import store from '@/store/index.js'

export default {
  name: "app",
  data: () => {
    return {
      tl: null,
      mobileMenuTl: null,
      navigation: {
        "from": {
          path: "",
          name: ""
        },
        "to": {
          path: "",
          name: ""
        }
      }
    }
  },
  methods: {
    transitionOut(to, name) {
      const from = this.$router.currentRoute.path

      if(from == to) {
        return
      }
      this.navigation = {
        "from": {
          path: this.$router.currentRoute.path,
          name: this.$router.currentRoute.name
        },
        "to": {
          path: to,
          name: name
        }
      }

      this.changeComponentLoaded(false)
  
      this.updateNavigation(
        this.navigation
      )

      this.tl = new TimelineMax({ 
        onComplete: this.finishedAnimation
      })

      //Timeline description for pages transition

      this.tl.to(".navigationChange", {
        display: 'block'
      }, 0)
      .to(".panTransition1", {
        duration: 0.5,
        ease: Power1.easeNone,
        top: 0,
      }, 0)
      .to(".panTransition2", {
        duration: 0.6,
        ease: Power1.easeNone,
        top: 0
      }, 0)
      .to(".panTransition3", {
        duration: 0.8,
        ease: Power1.easeNone,
        top: 0
      }, 0)
      .to(".panTransition4", {
        duration: 0.95,
        ease: Power1.easeNone,
        top: 0
      }, 0)
      .to(".movingTitle", {
        duration: 0.6,
        ease:  Power3.easeNone,
        left: 0
      }, 0.35)
    },
    finishedAnimation() {
      //change route when animation ends
      const path = this.getNextPath
      if(path !== "")
        this.$router.push({ path: path })
    },
    openMobileMenu() {
      this.mobileMenuTl = new TimelineMax({
      })

      this.mobileMenuTl
      .to(".routerLink", {
          opacity: 0,
          duration: 0.1
      })
      .to("#menu", {
        display: 'flex',
        left: 0,
        duration: 0.3
      })
      .to(".routerLink", {
          opacity: 1,
          duration: 0.4,
          stagger: 0.1
      })
      .to("#leaveMobileMenu", {
          opacity: 1,
          y: 0,
          duration: 0.4
      },0.5)
    },
    leaveMobileMenu() {
      if(this.mobileMenuTl)
        this.mobileMenuTl.reverse()
    },
    ...mapActions([
      'updateNavigation',
      'changeComponentLoaded'
    ])
  },
  mounted() {
    this.tl = new TimelineMax({ 
      onComplete: this.finishedAnimation
    })

    //Check if new route is loaded before animation out

    store.watch(this.getComponentLoadingState, (state) => {
      console.log(state)
      if(state){
        this.tl.reverse()
        this.changeComponentLoaded(false)
      }
    })
  },
  computed: {
    ...mapGetters([
      'getNextPath',
      'getComponentLoadingState',
      'getNavigation'
    ])
  }
}
</script>

<style lang="stylus">
  @font-face
   font-family Avenir-medium
   src url(assets/fonts/AvenirLTStd-Medium.otf)

  @font-face
   font-family Avenir-light
   src url(assets/fonts/AvenirLTStd-Book.otf)

  @font-face {
    font-family: ArchivoNarrow-Medium;
    src: url(assets/fonts/ArchivoNarrow-Medium.ttf);
  }

  @font-face {
    font-family: PlayfairDisplay-Bold;
    src: url(assets/fonts/PlayfairDisplay-Bold.ttf);
  }

  body
    margin 0

  a
    text-decoration none
    color #000

  .bold
    font-weight bold

  .pointer
    cursor pointer

  .panTransition
    position fixed
    top 100%
    left 0
    width 100%
    height 100%
    z-index 15

    &:nth-child(3)
      background-color #285943
    &:nth-child(4)
      background-color #77af9c
    &:nth-child(5)
      background-color #8cd790
    &:nth-child(6)
      background-color #d7fff1

  .navigationChange 
    position absolute
    overflow hidden
    text-align center
    z-index 16
    display none

    &#navigationChange
      top 20%
      left 30%

    &#navigationChange2
      bottom 20%
      right 50%

    .titleNav 
      font-size 8em
      opacity 0
      &.movingTitle
        position absolute
        opacity 1
      &#toTitle
        left -150%
      &#toTitle2
        left 150%

    
      @media screen and (max-width: 900px)
        font-size 4em 
      

  #app
    font-family Avenir-medium
    font-size 18px
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50

  #nav
    display flex
    margin-top 50px
    position fixed
    top 0px
    z-index 5
    justify-content space-between
    width 100%

    div
      margin 0 50px

      @media screen and (max-width: 600px)
        margin 0 0px 

  #menu
    justify-content space-around

    a
      margin 0 25px
      opacity 1 

    #leaveMobileMenu
      display none
    
    @media screen and (max-width: 600px)
      display none
      background-color #fff
      position fixed
      width 100%
      height 100%
      top 0
      flex-direction column
      align-items center
      font-size 2em
      justify-content center
      left -100%
      margin 0px 0px  

      a
        margin 20px
        opacity 1

      #leaveMobileMenu
        display block
        position fixed
        bottom 40px
        opacity 0
        left 50%
        transform translateX(-50%) translateY(50px)
        width 30px
        height auto

  #mobile_menu
    display none
    align-items center

    img
      height 30px
      width auto

    @media screen and (max-width: 600px)
      display flex 

  .menu 
    display flex
    align-items flex-end

  #logo
    height 50px
    width auto
    margin 0 25px

  .componentContainer
    padding-top 150px
</style>
