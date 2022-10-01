//This file will contain a class of display objects. With 3d meshes.
//Its contructor will initiate the spawn animation, rising from the floor..
//Somehow it will have to interact with the floor tile above it....


import * as THREE from 'three'
import { HologramObject } from '../HologramObject';


export class ConsoleObject {

    constructor(name, positionX = 0, positionZ = 0){
        this.name = name;
        this.child = null;
        

///////////////////////////////////////////////trash
        const geometry = new THREE.BoxGeometry(1,1,1);

        // Materials
        const material = new THREE.MeshStandardMaterial()
        material.color = new THREE.Color(0xff0000)

        material.transparent = true;
        material.opacity = .2

        // Mesh
        this.mesh = new THREE.Mesh(geometry,material)

        this.mesh.position.y = -2;
        this.mesh.position.x = positionX;
        this.mesh.position.z = positionZ;
        this.startingAnimation();
////////////////////////////////////////////////



        //load the model in
        //add the model to scene???????????????????????????
        //play the animation
        //once the animation is finished, spawn the hologram object




        // this.childHologram = new HologramObject(name, value)

    }

    startingAnimation(){

        //I have no idea if this is a good way to do this...considering I'm creating a seperate animation loop
        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update objects
            this.mesh.position.y = .4 * elapsedTime
            
            if(this.mesh.position.y < 1)
                window.requestAnimationFrame(tick)
            else 
                return
        }

        tick()
    }

    spawnChild(value, font){
        console.log("this", this.name, this.positionX, this.positionZ)
        this.child = new HologramObject(this.name, value, font, this.mesh.position.x, this.mesh.position.z)

        return this.child;
    }
}