import * as THREE from 'three'
import { FontLoader } from './myFontLoader.js'    //only exists locally in src file, not to be found elsewhere....
import { TextGeometry } from './TextGeometry.js'  //only exists locally in src file, not to be found elsewhere...


// Text material
const textMaterial = new THREE.MeshLambertMaterial()
textMaterial.color = new THREE.Color(0x00ff00)
textMaterial.transparent = true;
textMaterial.opacity = .8


export class HologramObject {

    constructor(name, value, font, positionX = 0, positionZ = 0){
        this.name = name;
        this.value = value;
        this.font = font;
        this.positionX = positionX;
        this.positionZ = positionZ;

        this.light = new THREE.PointLight(0x00ff00, .4)
        this.light.position.set(positionX - 1, 2 , positionZ + .15)


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
        textMesh.scale.set( .0005, .0005, .0005 )

        textMesh.position.set(positionX - 1, 2, positionZ )

        this.mesh = textMesh
    }

    makeTextObject(value){

        const geometry = new TextGeometry( value, {
            font: this.font,
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
        textMesh.scale.set( .0005, .0005, .0005 )

        textMesh.position.y = 2;
        textMesh.position.x = this.positionX - 1;
        textMesh.position.z = this.positionZ;

        return textMesh;

    }

    updateValue(value){
        if(value != this.value){
            
            const geometry = new TextGeometry( value, {
                font: this.font,
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
            textMesh.scale.set( .0005, .0005, .0005 )

            textMesh.position.y = 2;
            textMesh.position.x = this.positionX - 1;
            textMesh.position.z = this.positionZ;


            this.mesh = textMesh
        }
    }

}

