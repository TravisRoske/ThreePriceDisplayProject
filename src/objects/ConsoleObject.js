import * as THREE from 'three'
import { HologramObject } from '../HologramObject';


//Maket these extend THREE.Mesh()?????
export class ConsoleObject {

    constructor(name, positionX = 0, positionZ = 0){
        this.name = name;
        this.child = null;
        
///////////////////////////////////////////////trash
        const geometry = new THREE.BoxGeometry(1,1,1);

        // Materials
        const material = new THREE.MeshStandardMaterial()
        material.color = new THREE.Color(0xff0000)

        // Mesh
        this.mesh = new THREE.Mesh(geometry,material)

        this.mesh.position.y = -2;
        this.mesh.position.x = positionX;
        this.mesh.position.z = positionZ;

////////////////////////////////////////////////

        //once the animation is finished, spawn the hologram object


        // this.childHologram = new HologramObject(name, value)

    }


    init(value, font){

        //returns a promise, that resolves as the new HologramObject child after the animation finishes
        return new Promise((resolve, reject)=>{ 
            //I have no idea if this is a good way to do this...considering I'm creating seperate animation loops
            const clock = new THREE.Clock()

            const tick = () => {
                const elapsedTime = clock.getElapsedTime()

                // Update objects
                this.mesh.position.y = .4 * elapsedTime
                
                if(this.mesh.position.y < 1){
                    window.requestAnimationFrame(tick)
                }
                else {

                    this.child = new HologramObject(this.name, value, font, this.mesh.position.x, this.mesh.position.z)

                    resolve( this.child )
                
                }
            }

            tick()
        })
    }

}