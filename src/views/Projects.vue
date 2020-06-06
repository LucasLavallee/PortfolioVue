<template>
  <div id="projects" class="componentContainer">
    <div id="scrollBar">
    </div>
    <div id="projectList" class="horizontal">
      <div v-for="(project, index) in data" class="project" :key="index">
        <div class="projectImg" @click="openDescription(index)" :id="'projectImg'+index" :ref="'projectImg'+index" :style="{'background-image': `url(${require('@/assets/projects/projectsImg/'+project.images.main.link)})`}">
          <p class="projectNumber">{{index + 1}}</p>
          <img v-if="project.images.main.link != ''" >
        </div>
        <h2 class="projectName">{{project.name}}</h2>
        <div class="projectKeywords"> 
          <p v-for="(keyword, id) in project.keywords" :key="id">#{{ keyword }}</p>
        </div>
      </div>
    </div>
    <Project 
      v-if="getActiveProject.id != null"
      @leaving="scrollState = 'horizontal'"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store/index.js'
import Project from '@/components/projects/Project.vue'
import ProjectsDisplayColumn from '@/components/svgIcons/ProjectsDisplayColumn.vue'
import ProjectsDisplayRow from '@/components/svgIcons/ProjectsDisplayRow.vue'
import { mapActions, mapGetters } from 'vuex'
import { TimelineMax, gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default {
  name: 'projects',
  components: {
    Project,
    ProjectsDisplayColumn,
    ProjectsDisplayRow
  },
  data () {
    return {
      tl: null,
      scrollState: 'horizontal' // horizontal || vertical
    }
  },
  methods: {
    addListeners() {
      window.addEventListener('wheel', this.manageScrollVariation)
    },
    removeListeners() {
      window.removeEventListener('wheel', this.manageScrollVariation)
    },
    manageScrollVariation(e) {
      if (this.scrollState == 'horizontal' && event.deltaY != 0) {
      	// manually scroll horizonally instead
        window.scroll(window.scrollX + event.deltaY * 20, window.scrollY)
        
        // prevent vertical scroll
      	event.preventDefault()
      }
      return
    },
    openDescription (index) { // Update active project when a click is trigger on a project


      this.scrollState = 'vertical'

      const div = this.$refs['projectImg' + index]
      const pos = div[0].getBoundingClientRect()

      this.updateActiveProject({
        id: index,
        size: [div[0].offsetWidth, div[0].offsetHeight],
        offset: [pos.x, pos.y],
        color: div[0].style.backgroundColor
      })
    },
    deployProjects () { //Animation that display projects
      this.tl = new TimelineMax({
        onReverseComplete: this.onAnimReverse
      })

      this.tl.to('.project', {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1
      }, 0)
    },
    onAnimReverse () {
      this.deployProjects()
    },
    ...mapActions([
      'updateActiveProject',
      'setRandomUi',
      'changeComponentLoaded',
      'changeActiveProjectDisplay'
    ])
  },
  computed: {
    data () {
      return store.state.projects.map((item) => {
        return item
      })
    },
    ...mapGetters([
      'getActiveProject'
    ])
  },
  mounted () {
    gsap.registerPlugin(CSSPlugin)
    this.changeComponentLoaded(true) // When component is mounted, update state value to trigger page transition
    this.deployProjects()
    this.addListeners()
  },
  destroyed () {
    this.removeListeners()
  }
}
</script>

<style lang="stylus">
  sideBarWidth = 200px

  #scrollBar
    position fixed
    left 0
    top 0
    width sideBarWidth
    height 100%
    z-index 2
    display flex
    flex-direction column-reverse
    background-color #fff

    @media screen and (max-width: 900px)
      display none

  #projectList
    display flex
    position relative
    padding-left sideBarWidth
    flex-direction column

    @media screen and (max-width: 900px)
      padding-left 0

    &.horizontal
      flex-direction row

      @media screen and (max-width: 900px)
        flex-direction column

  .project
    margin 0 100px
    padding-top 100px
    opacity 0
    transform translateX(-50px)

    @media screen and (max-width: 700px)
      margin 0 auto
      padding-top 0px
      margin-bottom 75px

  .projectName
    font-weight bold
    font-size 2em
    text-align center

  .projectImg
    width 50vh
    height 50vh
    position relative
    background no-repeat center center
    background-size cover
    box-shadow 0px 0px 38px -3px rgba(209,209,209,0.57)
    cursor pointer

    @media screen and (max-width: 700px)
      width 80vw
      height 80vw
      margin 0 auto

  .projectNumber
    position absolute
    top -85px
    left 25px
    font-weight bold
    font-size 50px
    font-family  ArchivoNarrow-Medium

  .projectKeywords
    display flex
    width 50vh
    flex-wrap wrap
    justify-content center
    
    p
      padding 0 15px
      margin 0

  #displaySelection
    display flex
    justify-content space-around
    margin 25px 0

</style>
