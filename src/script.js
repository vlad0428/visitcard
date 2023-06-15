import '../style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from 'dat.gui'
import {Triangle} from "three";
import {gsap} from "gsap";


window.addEventListener('load',() => {

})



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.heigh = window.innerHeight

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
})

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})

//Orbit control
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3);

renderer.render(scene, camera)

// *
//Meshes
// *

//TRIANGLE
const radius = 4;
const height = 5;
const radialSegments = 3;
const geometry1 = new THREE.ConeGeometry(radius, height, radialSegments);

let triangleMesh = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial());
triangleMesh.position.z = 23
triangleMesh.position.x = -6
scene.add(triangleMesh)

//DODECAHEDRON
const radius2 = 1;
const geometry2 = new THREE.DodecahedronGeometry(radius2);
const material2 = new THREE.MeshNormalMaterial({
    // transparent: true,
    // opacity: 0.65
    wireframe: false
})
const dodecahedronMesh = new THREE.Mesh(geometry2, material2)
dodecahedronMesh.position.z = 27
dodecahedronMesh.position.x = -6
scene.add(dodecahedronMesh)

//Donut
let donutGltf
const loadingBarElement = document.querySelector('.wrapper')
// loadingBarElement.classList.add('ended')


const gltfLoader = new GLTFLoader()
gltfLoader.load(
    'Obj/Donut/glTF/scene.gltf',
    (gltf) => {
        window.setTimeout(() => {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, {duration: 3, value: 0, delay: 1})

            // Update loadingBarElement

            loadingBarElement.style.transform = ''
        }, 100)
        donutGltf = gltf

        gltf.scene.scale.set(0.125, 0.125, 0.125)
        gltf.scene.rotation.x = 0.54
        gltf.scene.rotation.z = 0.26
        gltf.scene.position.z = -5;
        gltf.scene.position.x = 2;

        scene.add(gltf.scene)
        const main = document.querySelector('main')
        main.classList.remove('hideMain')
        const preloader = document.querySelector('.wrapper')
        preloader.classList.add('ended')
        const body = document.querySelector('body')
        body.removeAttribute('style')


    },
    () => {

    },
    () => {
    }
)
//Textures
const meTexture = new THREE.TextureLoader().load('someRichMan.png')
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture

const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
        {
            uAlpha: {value: 1}
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
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

//MESH
const me = new THREE.Mesh(
    new THREE.BoxBufferGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({map: meTexture})
)

scene.add(me)

me.position.z = -5;
me.position.x = 2;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    me.rotation.x += 0.05;
    me.rotation.y += 0.075;
    me.rotation.z += 0.05;

    triangleMesh.rotation.y = t * -0.005;

    if (window.pageYOffset > 1450) {
    } else {
        camera.position.z = t * -0.02;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
    }

}
let progress = document.getElementById('progressbar');
let webgl = document.body;
let hideMain = document.querySelector('.hideMain');
let totalHeight = window.innerHeight - webgl.scrollHeight
document.body.onscroll = () => {
    moveCamera()
    let progressHeight = ( window.pageYOffset / hideMain.offsetHeight ) * 125;
    progress.style.height = progressHeight + "%";
    console.log(progressHeight)
};

moveCamera();

let t = 0

function animate() {
    requestAnimationFrame(animate)
    if (donutGltf) {

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


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)


//////////////////////////////////////////////////////////////////////



