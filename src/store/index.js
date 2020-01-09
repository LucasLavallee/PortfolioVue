import Vue from 'vue'
import Vuex from 'vuex'
import json from '@/assets/projects/projects.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeProject: {
      id: null,
      size: [],
      offset: [],
      color: null
    },
    projects: json.projects,
    navigation: {
      from: {
        path: '',
        name: ''
      },
      to: {
        path: '',
        name: ''
      }
    },
    componentLoaded: false,
    activeProjectDisplay: 0, // 0 = column, 1 = row
    homeDisplayData: {
      zoom: 0
    }
  },
  mutations: {
    UPDATE_ACTIVE_PROJECT (state, newVal) {
      state.activeProject = newVal
    },
    SET_RANDOM_UI (state) {
      state.projects.map(n => {
        n.uiClass = 'projectStyle' + Math.floor(Math.random() * 3)
      })
    },
    RESET_ACTIVE_PROJECT (state) {
      state.activeProject = {
        id: null,
        size: [],
        offset: [],
        color: null
      }
    },
    UPDATE_NAVIGATION (state, newVal) {
      state.navigation = newVal
    },
    CHANGE_COMPONENT_LOADED (state, bool) {
      state.componentLoaded = bool
    },
    CHANGE_ACTIVE_PROJECT_DISPLAY (state, val) {
      state.activeProjectDisplay = (val === 1 || val === 0) ? val : 0
    },
    UPDATE_HOME_ZOOM (state, zoom) {
      state.homeDisplayData.zoom = zoom || state.homeDisplayData
    }
  },
  actions: {
    updateNavigation: (store, props) => {
      store.commit('UPDATE_NAVIGATION', props)
    },
    updateActiveProject: (store, props) => {
      store.commit('UPDATE_ACTIVE_PROJECT', props)
    },
    setRandomUi: (store) => {
      store.commit('SET_RANDOM_UI')
    },
    resetActiveProject: (store) => {
      store.commit('RESET_ACTIVE_PROJECT')
    },
    changeComponentLoaded: (store, props) => {
      store.commit('CHANGE_COMPONENT_LOADED', props)
    },
    changeActiveProjectDisplay: (store, val) => {
      store.commit('CHANGE_ACTIVE_PROJECT_DISPLAY', val)
    },
    updateHomeZoom: (store, val) => {
      store.commit('UPDATE_HOME_ZOOM', val)
    }
  },
  getters: {
    getActiveProject: state => state.activeProject,
    getProjectById: (state, id) => state.projects[id],
    getNextPath: state => state.navigation.to.path,
    getComponentLoadingState: state => () => state.componentLoaded,
    getNavigation: state => state.navigation,
    getActiveProjectDisplay: state => state.activeProjectDisplay,
    getHomeZoom: state => state.homeDisplayData.zoom
  },
  modules: {
  }
})
