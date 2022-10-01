import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { ConsoleObject } from './objects/ConsoleObject.js'
import { FloorTileObject } from './objects/FloorTileObject'



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials
const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0xff0000)

material.transparent = true;
material.opacity = .2

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)
sphere.position.set(-1, .5, 0)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 4
pointLight.position.y = 6
pointLight.position.z = 8
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, .8)
pointLight2.position.x = -4
pointLight2.position.y = 6
pointLight2.position.z = -8
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, .7)
pointLight3.position.x = 4
pointLight3.position.y = 6
pointLight3.position.z = -8
scene.add(pointLight3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//Initially generates the floor tiles around camera position
let tiles = generateTiles(camera.position);


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

// /////////
    tiles = updateTiles(camera.position, tiles)
    console.log(tiles.length, tiles[0].length)


    //get player position
    //generate tiles around the player position...
    //start with position... then load in a tile every space around the player...for 50 spaces each way
    //a 2d array of tiles, when you move, pop or shift from one side
    //then push or unshift new tiles....
    //each tile has a position... denoting it's center???
// //////////


    //Just put main loop in here...
    //every time interval, make a call to the next in the list
    //for its callback, use an update function....

    //if the object doesn't exist, spawn it in and add it to scene.
    //if it does exist, just update it???



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()





let consoleTest = new ConsoleObject();
scene.add(consoleTest.mesh)



let consoleTest2 = new ConsoleObject();
scene.add(consoleTest2.mesh)
consoleTest2.mesh.position.z = -4



function generateTiles(cameraPosition, tileGenerateDistance = 20){
    let tiles = []

    let originX = Math.floor(cameraPosition.x)
    let originZ = Math.floor(cameraPosition.y)

    for(let x = originX - 20; x < originX + 20; x++){

        let zRow = []

        for(let z = originZ - 20; z < originZ + 20; z++){

            let tile = new FloorTileObject( x,z );

            zRow.push(tile)

            scene.add(tile.mesh)

        }

        tiles.push(zRow)
    }

    return tiles;
}

///Work more on this later...
function updateTiles(cameraPosition, tiles, tileGenerateDistance = 20){

    let originX = Math.floor(cameraPosition.x)
    let originZ = Math.floor(cameraPosition.z)

    let lowX = tiles[0][0].x;
    let highX = tiles[tiles.length - 1][0].x;
    let lowZ = tiles[0][0].z;
    let highZ = tiles[0][tiles[0].length - 1].z;

    //if you moved positive on the x axis
    if(lowX - cameraPosition.x < -tileGenerateDistance){
        for(let step = 0; lowX + step + tileGenerateDistance < originX; step++){ ///Doens't work right
            //remove the first(lowest x) row of the tiles 2d array
            for(let t of tiles[0]){
                scene.remove(t.mesh)
            }
            tiles.shift()

            //add a new row to the upper x value
            let zRow = []
            let x = Math.floor(cameraPosition.x)
            let originZ = Math.floor(cameraPosition.z)

            for(let z = originZ - tileGenerateDistance; z < originZ + tileGenerateDistance; z++){

                let tile = new FloorTileObject( originX + step + tileGenerateDistance, z );

                zRow.push(tile)

                scene.add(tile.mesh)
            }

            tiles.push(zRow)
        }
    }

    //if you moved negative on the x axis
    if(highX - cameraPosition.x > tileGenerateDistance){
        //remove the last (highest x) row of the tiles 2d array
        for(let t of tiles[tiles.length - 1]){
            scene.remove(t.mesh)
        }
        tiles.pop()

        //add a new row to the lower x value
        let zRow = []

        for(let z = originZ - tileGenerateDistance; z < originZ + tileGenerateDistance; z++){

            let tile = new FloorTileObject( originX - tileGenerateDistance , z );

            zRow.push(tile)

            scene.add(tile.mesh)
        }

        tiles.unshift(zRow)
    }

    return tiles;
}
