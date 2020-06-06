<template>
  <div id="home">
    <BackgroundGL/>
    <div id="nameSection">
      <div id="mainPage">
        <h1>LUCAS <br>LAVALLEE</h1>
      </div>
    </div>
    <div id="selfDescription" ref="selfDescription">
      <div>
        <img src="../assets/me.png" alt="Lucas Lavallée" id="mePhoto">
      </div>
      <div id="additionalInfos">
        <p id="descr">Je suis Lucas Lavallée, un étudiant en 3ème année de formation d'ingénieur à l'<a href="https://www.ingenieur-imac.fr/" target="_blank" id="linkToImac">IMAC</a>. </p>
        <div id="skills">
          <div v-for="(skill) in skills" class="skill" :key="skill.name">
            <p class="skillName" :style="{'background-color': skill.color}">{{skill.name}}</p>
            <p>{{skill.technics}}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="experiences">
        <h2>Expériences</h2>
        <div id="experiencesList">
          <div id="timelineExp"></div>
          <Experience v-for="(experience) in experiences" :key="experience.name" :experience="experience"/>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BackgroundGL from '@/components/backgroundGL/BackgroundGL.vue'
import Experience from '@/components/experience/Experience.vue'
import { mapActions } from 'vuex'
import { TimelineMax } from 'gsap'

export default {
  name: 'home',
  components: {
    BackgroundGL,
    Experience
  },
  data () {
    return {
      zoom: 0,
      tl: null,
      skills: [
        {
          name: 'Développeur web',
          technics: 'Javascript (... ES6), PHP, HTML/CSS (Sass, Stylus), MySQL, MongoDB',
          color: '#fff275'
        },
        {
          name: 'Frameworks',
          technics: 'NodeJS, ThreeJS, VueJS, Laravel (Lumen)',
          color: '#fff275'
        },
        {
          name: 'Gestion de projet',
          technics: 'Trello, Jira, SCRUM',
          color: '#5c6bc0'
        },
        {
          name: 'Modélisation 3D',
          technics: 'Blender, MagicaVoxel',
          color: '#ff3c38'
        }
      ],
      experiences: [
        {
          date: "26 Janv. 2020 - 29 Janv. 2020",
          poste: "Développeur full-stack",
          descr: "Ultrackathon réalisé dans le cadre du festival sur les effets spéciaux PIDS (Paris Images Digital Summit). Le but de cette hackathon longue durée est de réaliser 2 court-métrages interactifs (filmés à l'avance). J'ai donc travaillé en collaboration avec des développeurs sur une PWA permettant de proposer aux spectateurs de films d'intéragir en direct sur des éléments de l'histoire selon des choix prédéfinis.",
          link: "http://interefx.fr/"
        },
        {
          date: "Juin. 2019 - Sept. 2019",
          poste: "Développeur back-end",
          descr: "Stage réalisé en tant que développeur back-end (framework Lumen) sur le projet d’intranet Inside de l’agence Maecia à Paris. Rôle de responsable back-end sur certains projets clients.",
          link: "https://www.maecia.com/"
        },
        {
          date: "Nov. 2018 - Mai 2018",
          poste: "Projet Tuteuré - GAsp | Développeur full-stack",
          descr: "Application web de manipulation et de partage d’algèbres geomètriques. Travail en collaboration avec Vincent Nozick (chercheur), Hugo Hadfield (doctorant Cambridge) et Vincent De Keninck.",
          link: "https://lucaslavallee.github.io/GAsp/"
        },
        {
          date: "Mai 2017 - Sept. 2017",
          poste: "Assistant développeur front-end",
          descr: "Assistant directeur technique chez E-Maj (Metz). Webdesign, intégration de sites institutionnels (Wordpress, Bootstrap).",
          link: "https://www.e-maj.com/"
        },
        {
          date: "2017",
          poste: "Responsable technique association White Waterpulse",
          descr: "Réalisation et maintenance du site web vitrine de l’association. Back-end pour la gestion des actualités, mailing.",
          link: ""
        },
      ]
    }
  },
  methods: {
    handleScroll (event) {
      const scrollPosition = window.scrollY
      const selfDPos = this.$refs.selfDescription.offsetTop
      if (scrollPosition > 0) {
        this.updateHomeZoom(((window.innerHeight + scrollPosition) * 100) / selfDPos)
      }
      if (selfDPos / 2 < scrollPosition) {
        this.triggerAnimation()
      }
    },

    triggerAnimation () {
      this.tl = new TimelineMax({})

      this.tl.to('#mePhoto', {
        opacity: 1,
        duration: 0.4,
        x: 0
      })
        .to('#descr', {
          duration: 0.4,
          opacity: 1,
          x: 0
        }, 0.2)
        .to('.skill', {
          duration: 0.4,
          stagger: 0.1,
          opacity: 1,
          x: 0
        }, 0.3)
        .to('#timelineExp', {
          duration: 0.8,
          height: '100%'
        }, 0.2)
        .to('.experience', {
          duration: 0.4,
          stagger: 0.1,
          opacity: 1,
          x: 0
        },0.2)
    },
    ...mapActions([
      'changeComponentLoaded',
      'updateHomeZoom'
    ])
  },
  created () {
    window.addEventListener('scroll', this.handleScroll) // add eventListener on scroll
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll) // remove eventListener on scroll
  },
  mounted () {
    this.changeComponentLoaded(true) // When component is mounted, update state value to trigger page transition
    this.updateHomeZoom(0)
  }
}
</script>

<style lang="stylus">
  #home
    margin-bottom 100px

  #nameSection
    position relative
    height 100vh
    width 100%

  #selfDescription
    position relative
    display flex
    flex-direction row
    margin 0 20%

    #descr
      margin 20px 50px
      font-size 2em
      text-align left
      transform translateX(-100%)
      opacity 0

      @media screen and ( max-width: 500px ) {
        margin 50px 0
      }

    @media screen and ( max-width: 1000px ) {
      flex-direction column
      justify-content center
    }

  #additionalInfos
    overflow hidden
    justify-content space-between
    display flex
    flex-direction column

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
    width 300px
    height auto

  #skills
    display flex
    flex-direction column
    margin-left 50px

    @media screen and ( max-width: 500px ) {
      margin 0
    }

    .skill
      margin 5px 0
      display inline-table
      opacity 0
      transform translateX(-100%)
      text-align left

      p
        margin 5px

  .skillName
    display inline-block

  #linkToImac
    color inherit
    text-decoration underline

  .specificSkillList
    display flex

  #experiences
    margin: 200px 20%

  #timelineExp
    width 5px 
    background-color #a9e7da
    position absolute
    height 0%
    left -50px

  #experiencesList
    position relative    
  
</style>
