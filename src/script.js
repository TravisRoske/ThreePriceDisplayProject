import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



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



