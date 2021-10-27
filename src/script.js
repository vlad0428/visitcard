import '../style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from 'dat.gui'
import {Triangle} from "three";
import {gsap} from "gsap";
// const GLTFLoader = new GLTFLoader()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)



const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})


//Orbit control
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3);

renderer.render(scene, camera)


// *
//Meshes
// *

//TRIANGLE
const radius =  4;
const height = 5;
const radialSegments =  3;
const geometry1 = new THREE.ConeGeometry(radius, height, radialSegments);

let triangleMesh= new THREE.Mesh( geometry1, new THREE.MeshNormalMaterial() );
triangleMesh.position.z = 23
triangleMesh.position.x = -6
scene.add(triangleMesh)
// gui.add(triangleMesh.rotation,'y').min(-10).max(5).step(0.01).name('triangleMesh - y rotation')


//DODECAHEDRON
const radius2 =  1;
const geometry2 = new THREE.DodecahedronGeometry(radius2);
const material2 =  new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.65
})
const dodecahedronMesh = new THREE.Mesh(geometry2,material2)
// const dodecahedronMesh2 = new THREE.Mesh(geometry2,material2)
dodecahedronMesh.position.z = 27
dodecahedronMesh.position.x = -6

// dodecahedronMesh2.position.z = 21
// dodecahedronMesh2.position.x = -9
scene.add(dodecahedronMesh)
// gui.add(dodecahedronMesh2.position,'z').min(15).max(30).step(1).name('dodecahedronMesh2 - z position')
// gui.add(dodecahedronMesh2.position,'x').min(-15).max(15).step(1).name('dodecahedronMesh2 - x position')


//Donut
let donutGltf
const loadingBarElement = document.querySelector('.loading-bar')
const gltfLoader = new GLTFLoader()
console.log(gltfLoader)
gltfLoader.load(
    'Obj/Donut/glTF/scene.gltf',
    (gltf) => {
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
        console.log('success')
        donutGltf = gltf

        gltf.scene.scale.set(0.125,0.125,0.125)
        // gltf.scene.rotation.x = 0.78
        gltf.scene.rotation.x = 0.54
        gltf.scene.rotation.z = 0.26
        gltf.scene.position.z = -5;
        gltf.scene.position.x = 2;
        // gui.add(gltf.scene.rotation,'z').min(-10).max(5).step(0.01).name('donut - z rotation')
        // gui.add(gltf.scene.rotation,'x').min(-10).max(5).step(0.01).name('donut - x rotation')
        // gui.add(gltf.scene.rotation,'y').min(-5).max(10).step(0.01).name('donut - y rotation')


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

const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
        {
            uAlpha: { value: 1 }
        },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

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

//MESH
const me = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: meTexture})
)

scene.add(me)

me.position.z = -5;
me.position.x = 2;

// gui.add(camera.position,'z').min(-100).max(100).step(1).name('z position')
//Dont forget about loading screen!!!

console.log(camera.position.z)

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    me.rotation.x += 0.05;
    me.rotation.y += 0.075;
    me.rotation.z += 0.05;

    triangleMesh.rotation.y = t * -0.005;

    if (window.pageYOffset > 1450){
    }
    else{
        camera.position.z = t * -0.02;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
    }

}

document.body.onscroll = moveCamera;
moveCamera();

let t = 0
function animate() {
    requestAnimationFrame(animate)
    if (donutGltf){

        donutGltf.scene.rotation.y += 0.01 * -Math.cos(0.2)

        t += 0.01
        // #1
        dodecahedronMesh.position.z = 4 * Math.sin(t) + 24
        dodecahedronMesh.position.x = 4 * Math.cos(t) + -6

        dodecahedronMesh.rotation.y += 0.01 * -Math.cos(0.2)
        dodecahedronMesh.rotation.z += 0.01 * -Math.cos(0.2)
    }
    renderer.render(scene, camera)
}
animate()

const pointLight = new THREE. PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)



//
// // const spaceTexture = new THREE.TextureLoader().load('space.jpg')
// // scene.background = spaceTexture
//
