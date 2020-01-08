import {
  MeshMatcapMaterial,
  UniformsUtils,
  ShaderLib
} from 'three'

import vs from './custom-matcap.vert'
import fs from './custom-matcap.frag'

export default class FluxCustomMatcapMaterial extends MeshMatcapMaterial {
  constructor (parameters = {}, uniforms = {}) {
    super()

    uniforms = {
      ...uniforms,
      uTime: { value: 0 }
    }

    this.uniforms = Object.assign(
      UniformsUtils.clone(ShaderLib.matcap.uniforms),
      uniforms
    )

    this.vertexShader = vs
    this.fragmentShader = fs
    this.type = 'FluxCustomMatcapMaterial'
    this.isMeshMatcapMaterial = true

    this.paused = false

    this.setValues(parameters)
  }

  render () {
    if (!this.paused) this.uniforms.uTime.value += 0.1
  }
}
