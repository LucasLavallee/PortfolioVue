import { MeshBasicMaterial, Object3D, Mesh, PlaneBufferGeometry } from "three"

export default class Ground extends Object3D{
    constructor () {
        super()
        this.material = new MeshBasicMaterial({
            color: 0x6eff4a
        })
        this.init()
    }

    init () {
        const geometry = new PlaneBufferGeometry( 150, 150, 2 )
        const plane = new Mesh( geometry, this.material )
        //*plane.rotation.x = Math.PI / 2 
        this.add( plane )
    }

}