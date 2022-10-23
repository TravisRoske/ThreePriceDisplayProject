import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { ConsoleObject } from './objects/ConsoleObject.js'
import { FloorTileObject } from './objects/FloorTileObject'
import { HologramObject } from './HologramObject'

"use strict"


// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


// Lights
const pointLight = new THREE.PointLight(0xffffff, .2)
pointLight.position.x = 8
pointLight.position.y = 6
pointLight.position.z = 8
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, .2)
pointLight2.position.x = -8
pointLight2.position.y = 6
pointLight2.position.z = -8
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, .2)
pointLight3.position.x = 8
pointLight3.position.y = 10
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

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

/////////
    tiles = updateTiles(camera.position, tiles)
//////////


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()





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

    //if you moved positive on the z axis

    //if you moved negative on the z axis

    return tiles;
}








import { FontLoader } from './myFontLoader.js'    //only exists locally in src file, not to be found elsewhere....
import { TextGeometry } from './TextGeometry.js'  //only exists locally in src file, not to be found elsewhere...



//Load font and return a promise
const myPromise = new Promise((resolve, reject) =>{
    const loader = new FontLoader();

    loader.load(
        'font.json', //somehow this resolves to the static folder, with or without the ./
    
        // onLoad callback
        function ( font ) {
            resolve(font)
        },
    
        // onError callback
        function ( err ) {
            console.log( 'An error happened' );
        }
    )
})

//when promise fullfills, start the api loop, with the loaded font
myPromise.then((resFont) =>{

    //make the list of crypto names
    let list = []
    fetch('https://api.coincap.io/v2/assets',
    {method: 'GET', redirect: 'follow'})
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        let info = result.data;
        for(let n of info){
            list.push(n.id);
        }

        return list;
    })
    .then((list) =>{
        //begin the main api loop'

        ////////temp//////////!!!!!!!!!
        list = list.slice(0,25);
        /////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        apiLoop(list, resFont);
    })
    .catch((err) => {
        console.log("Could not load list, error: ", err);
    })
})

//at regular intervals, this loop recursively calls the apiCall for the next item in the list
function apiLoop(list, font, index = 0) {
    setTimeout(() => {

        apiCall(list[index] , font);

        //increment the list and loop it back to beggining
        index = ++index % (list.length - 1);

        //calls itself, to set a new timeout
        apiLoop(list, font, index);

    }, 500)
}

//sends an api call to get the value of the crypto coin 'name'
function apiCall(name, font){
    fetch(`https://api.coincap.io/v2/assets/${name}`,
    {method: 'GET', redirect: 'follow'})
    .then((response) =>{
        return response.json()
    })
    .then((result) =>{
        let price = result.data.priceUsd;

        loadOrUpdateConsoles(name, price, font)
    })
}

let consoleMap = new Map();
//uses the name and value of the to either spawn a new console object or update the hologram on one of them.
function loadOrUpdateConsoles(name, value, font){

    console.log(name, "    :    ", value)/////////

    // //if the consoleObject doesn't already exist.
    if(consoleMap.get(name) === undefined){

        //add new console.  add mesh to scene.  the animation starts...
        let newConsole = new ConsoleObject(name , 0, consoleMap.size * -2)////////make the position of spawning dynamic
        consoleMap.set( name , newConsole )
        scene.add(newConsole.mesh)

        //console init plays animation and then spawns a child HologramObject, then returns a promise
        let newHologramPromise = newConsole.init(value, font)

        newHologramPromise.then((newHologram) => {
            scene.add(newHologram.mesh);
            scene.add(newHologram.light);
        })

    } else {

        let hologram = consoleMap.get(name).child;

        scene.remove(hologram.mesh)
        hologram.updateValue(value)
        scene.add(hologram.mesh)

    }
}