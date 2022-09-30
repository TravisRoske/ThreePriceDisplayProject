import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//creates a front view side panel
var elem = document.createElement('canvas')
elem.style.height = "50px";   //idk why these don't work
elem.style.width = "50px";
elem.style.scale = .65         //idk why I need this otherwise the element won't appear...
elem.style.margin = "8px";
elem.style.border = "2px solid green";

document.body.appendChild(elem);

const camera2 = new THREE.PerspectiveCamera(5, elem.width / elem.height, 0.1, 100)
camera2.position.set (5, 80, 0)
camera2.rotation.x = -1.5708
const renderer2 = new THREE.WebGLRenderer({
    canvas: elem
})
renderer2.setSize(elem.width, elem.height)
// renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
///




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

/**
 * Animate
 */

///
const clock = new THREE.Clock()
///
let counter = -5
///

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    renderer2.render(scene, camera2)



    //BTC update
    //Probably not the best timer system, but math.floor didn't work for it.
    if(clock.elapsedTime % 5 < .5 
        && clock.elapsedTime - counter > 4.5){
        getBitcoin()
        getEthereum()
        counter = clock.elapsedTime
    }



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()





import { FontLoader } from './myFontLoader.js'  //only exists locally in src file, not to be found elsewhere
import { TextGeometry } from './TextGeometry.js'
import { BoxGeometry } from 'three'


//  import {FontLoader} from '../node_modules/three/examples/jsm/loaders/FontLoader'


const loader = new FontLoader();
const font = loader.load(
    'font.json', //somehow this resolves to the static folder, with or without the ./

	// onLoad callback
	function ( font ) {
		// do something with the font
        const geometry = new TextGeometry( 'Fonts and static files have to be in the static folder...The path automatically resolves there...', {
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
        const material2 = new THREE.MeshStandardMaterial()
        material2.color = new THREE.Color(0x00ff00)


        // Mesh
        const text = new THREE.Mesh(geometry,material2)
        scene.add(text)

        text.scale.set(.0025,.0025,.0025)
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);






let bitcoin = new THREE.Mesh()
scene.add(bitcoin)
bitcoin.scale.set(.0045,.0045,.0045)
bitcoin.position.set(0,1,0)

function getBitcoin(){
    console.log('bitcoin called')
    let url = `https://api.coincap.io/v2/assets/bitcoin`

    fetch(url,
    {method: 'GET',
    redirect: 'follow'})
    .then(function(responce) {
        return responce.json()
    })
    .then(result => {
        let price = result.data.priceUsd
        console.log(price)
        
        const font2 = loader.load(
            'font.json', 
        
            // onLoad callback
            function ( font2 ) {

                const btcGeometry = new TextGeometry( `Bitcoin: ${price}`, {
                    font: font2,
                    size: 250,
                    height: 70,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                } );
                const btcMaterial = new THREE.MeshStandardMaterial()
                btcMaterial.color = new THREE.Color(0x0000ff)

                btcMaterial.transparent = true;
                btcMaterial.opacity = .5


                bitcoin.geometry = btcGeometry
                bitcoin.material = btcMaterial
            },
        
            // onError callback
            function ( err ) {
                console.log( 'An error happened' );
            }
        )
    })
    .catch(error => {
        console.log('Error', error)
    })
}



let ethereum = new THREE.Mesh()
scene.add(ethereum)
ethereum.scale.set(.0045,.0045,.0045)
ethereum.position.set(0,-1.5,0)

function getEthereum(){
    console.log('Ethereum called')
    let url = `https://api.coincap.io/v2/assets/ethereum`

    fetch(url,
    {method: 'GET',
    redirect: 'follow'})
    .then(function(responce) {
        return responce.json()
    })
    .then(result => {
        let price = result.data.priceUsd
        console.log(price)
        
        const font2 = loader.load(
            'font.json', 
        
            // onLoad callback
            function ( font2 ) {

                const ethereumGeometry = new TextGeometry( `Ethereum: ${price}`, {
                    font: font2,
                    size: 250,
                    height: 70,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                } );
                const ethereumMaterial = new THREE.MeshStandardMaterial()
                ethereumMaterial.color = new THREE.Color(0x0000ff)

                ethereum.geometry = ethereumGeometry
                ethereum.material = ethereumMaterial
            },
        
            // onError callback
            function ( err ) {
                console.log( 'An error happened' );
            }
        )
    })
    .catch(error => {
        console.log('Error', error)
    })
}