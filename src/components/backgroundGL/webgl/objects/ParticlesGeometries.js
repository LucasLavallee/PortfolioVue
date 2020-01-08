import {
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  Vector3,
  Mesh,
  SphereBufferGeometry,
  Object3D,
  TextureLoader,
  sRGBEncoding,
  Vector4,
  Quaternion
} from 'three'

import CustomMaterial from './material/CustomMatcapMaterial'

function randFloat (low, high) {
  return low + Math.random() * (high - low)
}

export default class ParticlesGeometries extends Object3D {
  constructor (options = {}) {
    super()
    this.baseGeometry = options.baseGeometry || new SphereBufferGeometry(1, 32, 32)
    this.color = options.color || 0xFFFFFF
    this.instances = 10
    this.bounds = 200
    this.time = 0

    this.moveQ = (new Quaternion(0.5, 0.5, 0.5, 0.0)).normalize()
    this.tmpQ = new Quaternion()
    this.currentQ = new Quaternion()
    this.createObj()
  }

  createObj () {
    this.geometry = new InstancedBufferGeometry()
    this.geometry.addAttribute('aPosition', this.baseGeometry.attributes.position)
    this.geometry.addAttribute('aNormal', this.baseGeometry.attributes.normal)
    this.geometry.addAttribute('aUv', this.baseGeometry.attributes.uv)
    this.geometry.setIndex(this.baseGeometry.index)

    this.translate = new InstancedBufferAttribute(new Float32Array(this.instances * 3), 3, false).setDynamic(true)
    this.orientations = new InstancedBufferAttribute(new Float32Array(this.instances * 4), 4, false).setDynamic(true)
    this.offsets = new InstancedBufferAttribute(new Float32Array(this.instances), 1, false)

    let vector = new Vector4()

    this.dataV = []

    for (let i = 0, ul = this.offsets.count; i < ul; i++) {
      let position = new Vector3()
      let velocity = new Vector3()
      let scale = Math.random() * 4 + 1

      position = new Vector3(
        randFloat(-this.bounds, this.bounds),
        randFloat(-this.bounds, this.bounds),
        randFloat(-this.bounds * 0.5, this.bounds * 0.5)
      )
      velocity = new Vector3(randFloat(-2, 2), randFloat(-2, 2), randFloat(-2, 2))

      this.translate.setXYZ(i, position.x, position.y, position.z)
      this.offsets.setXYZ(i, scale)
      this.dataV.push(velocity)

      vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
      vector.normalize()
      this.orientations.setXYZW(i, vector.x, vector.y, vector.z, vector.w)
    }

    this.geometry.addAttribute('aOrientation', this.orientations)
    this.geometry.addAttribute('aTranslate', this.translate)
    this.geometry.addAttribute('aOffset', this.offsets)

    const matcap = new TextureLoader().load(require('../../../../assets/textures/ceramic.jpg'))
    matcap.encoding = sRGBEncoding

    this.material = new CustomMaterial({
      matcap: matcap,
      color: this.color
    })

    this.mesh = new Mesh(this.geometry, this.material)
    this.add(this.mesh)
  }

  destroy () {
    this.material.dispose()
    this.geometry.dispose()
    this.matcap.dispose()
  }

  update () {
    this.material.render()
    var time = performance.now()
    var delta = (time - this.time) / 8000
    this.tmpQ.set(this.moveQ.x * delta, this.moveQ.y * delta, this.moveQ.z * delta, 1).normalize()

    for (let i = 0, ul = this.offsets.count; i < ul; i++) {
      let x = this.translate.getX(i) + this.dataV[i].x * 0.01
      let y = this.translate.getY(i) + this.dataV[i].y * 0.05
      let z = this.translate.getZ(i) + this.dataV[i].z * 0.05
      this.translate.setXYZ(i, x, y, z)

      if (this.translate.getX(i) < -this.bounds || this.translate.getX(i) > this.bounds) {
        this.dataV[i].x = -this.dataV[i].x
      }
      if (this.translate.getY(i) < -this.bounds || this.translate.getY(i) > this.bounds) {
        this.dataV[i].y = -this.dataV[i].y
      }
      if (this.translate.getZ(i) < -this.bounds || this.translate.getZ(i) > this.bounds) {
        this.dataV[i].z = -this.dataV[i].z
      }

      this.currentQ.fromArray(this.orientations.array, (i * 4))
      this.currentQ.multiply(this.tmpQ)
      this.orientations.setXYZW(i, this.currentQ.x, this.currentQ.y, this.currentQ.z, this.currentQ.w)
    }
    this.orientations.needsUpdate = true
    this.translate.needsUpdate = true

    this.time = time
  }
}
