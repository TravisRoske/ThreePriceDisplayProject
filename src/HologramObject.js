import * as THREE from 'three'
import { FontLoader } from './myFontLoader.js'    //only exists locally in src file, not to be found elsewhere....
import { TextGeometry } from './TextGeometry.js'  //only exists locally in src file, not to be found elsewhere...



// Text material
const textMaterial = new THREE.MeshStandardMaterial()
textMaterial.color = new THREE.Color(0x00ff00)


export class HologramObject {
    constructor(name, value, font){
        this.name = name;

        console.log("making text object")
        // make text object //
        const geometry = new TextGeometry( value, {
            font: font,
            size: 250,
            height: 70,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        const textMesh = new THREE.Mesh(geometry,textMaterial)
        textMesh.scale.set(.0025,.0025,.0025)

        this.mesh = textMesh;
    }
}

