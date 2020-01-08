/*import Ground from "./ground/Ground"
import TilesManager from "./tiles/TilesManager"*/
import { 
    Object3D, 
    IcosahedronGeometry,
    Mesh,
    MeshPhongMaterial,
} from "three"



export default class World extends Object3D{
    constructor () {
        super()
        /*this.height = 30
        this.width = 30
        this.radius = 2*/
        this.init()
    }

    init () {
        let SimplexNoise = require('simplex-noise')
        this.simplex = new SimplexNoise(Math.random)
        this.geometry = new IcosahedronGeometry(120, 4)

        for(let i = 0; i < this.geometry.vertices.length; i++) {
            let vector = this.geometry.vertices[i]
            vector._o = vector.clone(); 
        }
        this.material = new MeshPhongMaterial({
            emissive: 0xf7dada, 
            emissiveIntensity: 0.4,
            shininess: 0
        })

        this.shape = new Mesh(this.geometry, this.material)
        this.add(this.shape)
    }

    update (dt, mouse) {
        for(let i = 0; i < this.geometry.vertices.length; i++) {
            let vector = this.geometry.vertices[i]
            vector.copy(vector._o)
            let perlin = this.simplex.noise3D(
                (vector.x * 0.006) + (dt * 0.0002),
                (vector.y * 0.006) + (dt * 0.0003),
                (vector.z * 0.006)
            )
            let ratio = ((perlin*0.4 * (mouse.y + 0.1)) + 0.8)
            vector.multiplyScalar(ratio)
        }
        this.geometry.verticesNeedUpdate = true
        /*for(let i = 0; i < this.children.length; i++) {
            this.children[i].update()
        }*/
    }
}