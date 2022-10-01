//These will spawn automatically and despawn based on the user's position
//They will open up when a new console spawns underneath them...
import * as THREE from 'three'


export class FloorTileObject{
    constructor(posX, posZ){
        this.x = posX;
        this.z = posZ;

        this.geo = new THREE.PlaneGeometry(.9,.9)
        this.material = new THREE.MeshStandardMaterial();

        this.mesh = new THREE.Mesh(this.geo, this.material);


        this.mesh.position.x =  this.x;
        this.mesh.position.z =  this.z;

        //temp/// will delete when i upload actual objects
        this.mesh.rotation.x = - Math.PI / 2
        ////

    }
}