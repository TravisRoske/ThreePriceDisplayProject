import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import {ConsoleObject} from './objects/ConsoleObject.js'



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
