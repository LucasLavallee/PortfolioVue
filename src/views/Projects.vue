<template>
  <div id="projects" class="componentContainer">
    <div id="scrollBar">
      <div id="displaySelection">
        <ProjectsDisplayColumn @click.native="changeDisplay(0)"/>
        <ProjectsDisplayRow @click.native="changeDisplay(1)"/>
      </div>
    </div>
    <div id="projectList" :class="getActiveProjectDisplay ? 'horizontal' : 'vertical'">
      <div v-for="(project, index) in data" class="project" :class="project.uiClass === '' ? setRandomUi() : project.uiClass" :key="index">
        <div class="projectImg" @click="openDescription(index)" :id="'projectImg'+index" :ref="'projectImg'+index" :style="{'background-image': `url(${require('@/assets/projects/projectsImg/'+project.images.main.link)})`}">
          <p class="projectNumber">{{index + 1}}</p>
          <img v-if="project.images.main.link != ''" :alt="project.images.main.alt">
        </div>
        <div class="projectName">
          <p >{{project.name}}</p>
          <div class="projectCategories">
            <div v-for="(category) in project.categories" :style="{'background-color': `${category.color}`}" :key="category.name">
              <p>{{ category.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Project v-if="getActiveProject.id != null"/>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store/index.js'
import Project from '@/components/projects/Project.vue'
import ProjectsDisplayColumn from '@/components/svgIcons/ProjectsDisplayColumn.vue'
import ProjectsDisplayRow from '@/components/svgIcons/ProjectsDisplayRow.vue'
import { mapActions, mapGetters } from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'projects',
  components: {
    Project,
    ProjectsDisplayColumn,
    ProjectsDisplayRow
  },
  data () {
    return {
      tl: null
    }
  },
  methods: {
    openDescription (index) { // Update active project when a click is trigger on a project
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
      this.changeActiveProjectDisplay(this.getActiveProjectDisplay === 1 ? 0 : 1)
      this.deployProjects()
    },
    changeDisplay (val) { //Change projects display (vertical || horizontal)
      const currentVal = this.getActiveProjectDisplay
      if (currentVal === val) { return }
      this.tl.reverse()
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
      'getActiveProject',
      'getActiveProjectDisplay'
    ])
  },
  mounted () {
    this.changeComponentLoaded(true) // When component is mounted, update state value to trigger page transition
    this.deployProjects()
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
    display flex
    flex-direction row
    margin 100px
    opacity 0
    transform translateX(-50px)

    @media screen and (max-width: 700px)
      flex-direction column
      align-items center

    &:nth-child(2n)
      flex-direction row-reverse
      transform translateX(50px)

      @media screen and (max-width: 700px)
        flex-direction column

  .projectName
    font-weight bold
    text-align left
    margin 0 25px
    display flex
    flex-direction column
    justify-content space-between

  .projectStyle0
    .projectImg
      width 450px
      height 600px
      background-color #D7FFF1

      @media screen and (max-width: 450px)
        width 400px
        height 500px

  .projectStyle1
    .projectImg
      width 600px
      height 400px
      background-color #8CD790

      @media screen and (max-width: 600px)
        width 400px
        height 280px

  .projectStyle2
    .projectImg
      width 500px
      height 500px
      background-color #77AF9C

      @media screen and (max-width: 500px)
        width 400px
        height 400px

  .projectImg
    position relative
    background no-repeat center center
    background-size cover
    box-shadow 0px 0px 38px -3px rgba(209,209,209,0.57)

    @media screen and (max-width: 700px)
      width 100%
      height auto

  .projectNumber
    position absolute
    top -85px
    left 25px
    font-weight bold
    font-size 50px
    font-family  ArchivoNarrow-Medium

  .projectCategories
    p
      text-align center
      padding 5px

  #displaySelection
    display flex
    justify-content space-around
    margin 25px 0

</style>
