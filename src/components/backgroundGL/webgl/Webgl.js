import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  HemisphereLight,
  DirectionalLight,
  Vector2
} from 'three'
import World from './objects/world/World'
import { OrbitControls } from './controls/OrbitControls'
import { TweenMax, Power1 } from 'gsap'
import store from '../../../store'

export default class Webgl {
  constructor ($object) {
    this.dt = 0

    this.render = this.render.bind(this)
    this.onResize = this.onResize.bind(this)

    /* Init renderer and canvas */
    this.container = $object || document.body
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: $object
    })
    this.renderer.preserveDrawingBuffer = true
    this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)

    this.renderer.setClearColor(new Color('#A9E7DA'), 1)
    // this.renderer.shadowMap.enabled = true

    /* Main scene and camera */
    this.scene = new Scene()

    this.ambientLight = new HemisphereLight(0xffffff, 0xd1d1d1, 0.6)
    this.scene.add(this.ambientLight)

    this.light = new DirectionalLight(0xffffff, 0.5)
    this.light.position.set(200, 300, 400)
    this.scene.add(this.light)

    this.light2 = this.light.clone()
    this.light2.position.set(-200, 300, 400)
    this.scene.add(this.light2)

    this.camera = new PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.camera.position.set(60, 0, 900)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.mouse = new Vector2(0.8, 0.5)

    this.onMouseMove = this.onMouseMove.bind(this)

    this.initObjects()
  }

  initObjects () {
    this.world = new World()
    this.scene.add(this.world)

    window.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseMove (e) {
    TweenMax.to(this.mouse, 0.8, {
      y: (e.clientY / window.innerHeight),
      x: (e.clientX / window.innerWidth),
      ease: Power1.easeOut
    })
  }

  destroy () {
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0]
      if (this.scene.destroy) this.scene.destroy()
      this.scene.remove(child)
    }
    this.renderer.renderLists.dispose()
  }

  updateCamera () {
    const zoomValue = store.getters.getHomeZoom
    if (zoomValue < 120) {
      TweenMax.to(this.camera.position, 0.5, {
        z: 900,
        ease: Power1.easeOut
      })
    }
    if (zoomValue > 120) {
      TweenMax.to(this.camera.position, 0.5, {
        z: 300,
        ease: Power1.easeOut
      })
    }
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
    Render loop
  */
  render () {
    this.dt++
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    this.world.update(this.dt, this.mouse)
    this.updateCamera()
  }
}
