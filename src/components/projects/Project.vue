<template>
    <div class="projectDescription">
        <div id="opacity"></div>
        <div id="projectContainer">
            <div id="projectImg" :style="imgContainerStyle"></div>
            <div id="mainContainer">
                <div id="projectContent">
                    <div id="projectName">
                        <h2>{{getProjects().name}}</h2>
                    </div>
                    <div id="projectMain" class="bold active">
                        <p>{{getProjects().description}}</p>
                    </div>
                    <div id="projectTechnics" class="active">
                        <p v-for="(technic, id) in getProjects().technics" :key="id">{{technic}}</p>
                    </div>
                    <div :class="getProjects().team.length > 0 ? 'active': ''" id="projectTeam">
                      <h2>Equipe: </h2>
                      <a v-for="(member, idMember) in getProjects().team" :href="member.link" :key="idMember" target="_blank">{{member.name}}</a>
                    </div>
                    <div id = "ressources" class="active">
                        <h2>Ressources: </h2>
                        <p v-if="getProjects().ressources.length === 0">---</p>
                        <div v-for="(ressource, id) in getProjects().ressources" :key="id" class="ressource">
                            <a v-if="ressource.type === 'link'" :href="ressource.link" target="_blank">{{ressource.text}}</a>
                            <p v-if="ressource.type === 'file'" @click="downloadRessource(ressource.link)">{{ressource.text}}</p>
                            <a v-if="ressource.type === 'github'" :href="ressource.link" target="_blank"><img src="@/assets/github.png"></a>
                        </div>
                    </div>
                </div>

                <div id="galleryContainer" ref="galleryContainer">
                    <img v-for="image in loadGallery" :src="image.link" :alt="image.alt" class="galleryImg" :key="image.alt">
                </div>

                <div id="bottomPanel">
                    <p class="bold pointer"  @click="leaveProject">Leave</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import store from '@/store/index.js'
import { mapActions, mapGetters } from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'projectDescription',
  components: {
  },
  data () {
    return {
      images: [],
      tl: null
    }
  },
  mounted: function () {
    this.deployedProject()
  },
  methods: {
    downloadRessource(url) {
    },
    getProjects () {
      const active = this.getActiveProject.id
      return store.state.projects[active]
    },
    ...mapActions([
      'resetActiveProject'
    ]),
    deployedProject () {
      this.tl = new TimelineMax({
        onReverseComplete: this.resetActiveProject
      })

      // Timeline description project apparition

      this.tl.to('#projectImg', {
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        duration: 0.5
      })
        .to('#opacity', {
          opacity: 1,
          duration: 0.2
        }, 0)
        .to('#projectMain', {
          opacity: 1,
          x: 0,
          duration: 0.3
        }, 0.4)
        .to('#projectTechnics', {
          opacity: 1,
          x: 0,
          duration: 0.3
        }, 0.4)
        .to('#projectTeam', {
          opacity: 1,
          x: 0,
          duration: 0.3
        }, 0.4)
        .to('#ressources', {
          opacity: 1,
          x: 0,
          duration: 0.3
        }, 0.4)
        .to('#projectName h2', {
          opacity: 1,
          y: 0,
          duration: 0.2
        })
        .to('#bottomPanel', {
          opacity: 1,
          duration: 0.3
        })
        .to('.galleryImg', {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.1
        }, 0.6)
    },
    leaveProject () {
      this.$emit('leaving')
      this.tl.reverse()
    }
  },
  computed: {
    imgContainerStyle () {
      return {
        top: store.state.activeProject.offset[1] + 'px',
        left: store.state.activeProject.offset[0] + 'px',
        width: store.state.activeProject.size[0] + 'px',
        height: store.state.activeProject.size[1] + 'px',
        backgroundColor: store.state.activeProject.color,
        backgroundImage: `url(${require('@/assets/projects/projectsImg/' + this.getProjects().images.main.link)})`
      }
    },
    loadGallery () {
      this.images = this.getProjects().images.others.reduce((acc, n) => {
        return [...acc, {
          alt: n.alt,
          link: require('@/assets/projects/projectsImg/' + n.link)
        }]
      }, [])
      return this.images
    },
    ...mapGetters([
      'getActiveProject',
      'getProjectById'
    ])
  }
}
</script>

<style lang="stylus">
    imgWidth = 40%

    @keyframes rainbow {
        from {
            filter: hue-rotate(0deg);
            background-position-x: 0%;

        }
        to {
            filter: hue-rotate(360deg);
            background-position-x: 600vw;

        }
    }

    #opacity
        background-color #fff
        position absolute
        height 100%
        width 100%
        opacity 0

    .projectDescription
        position fixed
        top 0
        left 0
        height 100%
        width 100%
        z-index 10

    #mainContainer
        position absolute
        margin-left imgWidth
        width 60%
        box-sizing border-box
        padding 5%
        height 100%
        overflow-y scroll

        @media screen and (max-width: 900px)
            margin-left 0px
            width 100%

    #projectImg
        background-color blue
        position absolute
        animation-duration .5s
        background no-repeat center center
        background-size cover

        @media screen and (max-width: 900px)
            display none

    #projectContainer
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        display flex
        flex-direction column

    #galleryContainer
        column-count 1
        colum-gap 0px

        img
            width auto
            max-height 400px
            max-width 100%
            height auto
            margin 5px
            box-shadow 0px 0px 38px -3px rgba(209,209,209,0.57)

    #projectContent
        display flex
        flex-direction column
        text-align left
        position relative
        justify-content center
        margin 10% 0%

    #projectName
        h2
            color #a19e9d
            font-family  PlayfairDisplay-Bold
            font-weight 400
            font-style normal
            opacity 0
            transform translate3d(0,50px,0)
            font-size 5em
            margin 30px 0

    #projectMain, #projectTechnics, #ressources, #projectTeam
      display none

    #projectMain.active, #projectTechnics.active, #ressources.active, #projectTeam.active
        transform translateX(50px)
        opacity 0
        display block

    #bottomPanel
        position fixed
        top 35px
        right 35px
        opacity 0
        display flex

        p
            margin 0 15px
            font-size 20px

    #galerie
        background linear-gradient( 92deg, #95d7e3, #eb76ff )
        background-size 600vw 600vw
        -webkit-background-clip text
        -webkit-text-fill-color transparent
        animation rainbow 2s linear infinite alternate

    .galleryImg
        opacity 0
        transform translate3d(0, -20px, 0)

    .ressource a, #projectTeam a
      display block
      font-weight bold
      color #257FD9

    

</style>
