import { Object3D, Vector3, BoxGeometry, Mesh} from "three";
import { randomFloat } from "../../../utils/basicFunctions";

export default class Cube extends Object3D{
    constructor (position, size, material) {
        super()
        this.cubePosition = position
        this.size = size
        this.material = material
        this.cubeRotation = new Vector3(randomFloat(0,0.01), randomFloat(0,0.01), randomFloat(0,0.01))
        this.init()
    }

    init() {
        let geometry = new BoxGeometry( this.size, this.size, this.size)
        this.cube = new Mesh(geometry, this.material)
        this.cube.position.set(this.cubePosition.x, this.cubePosition.y, this.cubePosition.z)
        this.add(this.cube)
    }

    update() {
        this.cube.rotation.x += this.cubeRotation.x 
        this.cube.rotation.y += this.cubeRotation.y 
        this.cube.rotation.z += this.cubeRotation.z 
    }
}