import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from 'dat.gui'
// const GLTFLoader = new GLTFLoader()

//Helper

const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)



const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3);

renderer.render(scene, camera)

//Donut
let donutGltf

const gltfLoader = new GLTFLoader()
console.log(gltfLoader)
gltfLoader.load(
    'Obj/Donut/glTF/scene.gltf',
    (gltf) => {
        console.log('success')
        donutGltf = gltf

        gltf.scene.scale.set(0.125,0.125,0.125)
        // gltf.scene.rotation.x = 0.78
        gltf.scene.rotation.x = 0.54
        gltf.scene.rotation.z = 0.26
        gltf.scene.position.z = -5;
        gltf.scene.position.x = 2;
        gui.add(gltf.scene.rotation,'z').min(-10).max(5).step(0.01).name('donut - z rotation')
        gui.add(gltf.scene.rotation,'x').min(-10).max(5).step(0.01).name('donut - x rotation')
        gui.add(gltf.scene.rotation,'y').min(-5).max(10).step(0.01).name('donut - y rotation')


        scene.add(gltf.scene)
    },
    () => {
        console.log('progress')
    },
    () => {
        console.log('error')
    }
)
//Textures
const meTexture = new THREE.TextureLoader().load('someRichMan.png')
const spaceTexture = new THREE.TextureLoader().load( 'space.jpg');
scene.background = spaceTexture

// const environmentMapTexture = new THREE.CubeTextureLoader().load([
//     '/textures/environmentMaps/0/px.jpg',
//     '/textures/environmentMaps/0/nx.jpg',
//     '/textures/environmentMaps/0/py.jpg',
//     '/textures/environmentMaps/0/nx.jpg',
//     '/textures/environmentMaps/0/pz.jpg',
//     '/textures/environmentMaps/0/nz.jpg',
// ])

//Оптимизировать объект!!

//Starts
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z)
    scene.add(star)
}
Array(200).fill().forEach(addStar)

//ME
const me = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: meTexture})
)

scene.add(me)

me.position.z = -5;
me.position.x = 2;

//Scroll
// camera.position.z = 10

gui.add(camera.position,'z').min(-100).max(100).step(1).name('z position')
//Dont forget about loading screen!!!

console.log(camera.position.z)

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    me.rotation.x += 0.05;
    me.rotation.y += 0.075;
    me.rotation.z += 0.05;
    //
    // me.rotation.y += 0.01;
    // me.rotation.z += 0.01;
    //
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
    console.log(camera.position.z)
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate)
    if (donutGltf){
        // donutGltf.scene.rotation.x += 0.01 * Math.cos(0.3)


        donutGltf.scene.rotation.y += 0.01 * -Math.cos(0.2)


        // donutGltf.scene.rotation.z += 0.01 * -Math.cos(0.2)
        // donutGltf.scene.rotation.z += 0.01
    }
    renderer.render(scene, camera)
}
animate()

const pointLight = new THREE. PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)




// const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// scene.background = spaceTexture

