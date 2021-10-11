import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// const GLTFLoader = new GLTFLoader()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})



const gltfLoader = new GLTFLoader()
console.log(gltfLoader)
gltfLoader.load(
    'Obj/Donut/glTF/scene.gltf',
    (gltf) => {
        console.log('success')
        gltf.scene.scale.set(0.225,0.225,0.225)
        scene.add(gltf.scene)
    },
    () => {
        console.log('progress')
    },
    () => {
        console.log('error')
    }
)


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)


//Textures

const manager = new THREE.LoadingManager();
const texture = new THREE.TextureLoader(manager).load( 'https://res.cloudinary.com/dydre7amr/image/upload/v1614177581/donutCool_vsn6dj.jpg');
texture.encoding = THREE.sRGBEncoding;
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 3, 1 );
console.log(texture)


//Obj
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({map: texture, wireframe: false})
const torus = new THREE.Mesh(geometry,material)
// scene.add(torus)


const pointLight = new THREE. PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

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

function animate() {
    requestAnimationFrame(animate)
    // gltf.scene.rotation.x += 0.01
    // gltf.scene.rotation.y += 0.007
    // gltf.scene.rotation.z += 0.01
    renderer.render(scene, camera)
}
animate()