//简单的3D场景
//import * as THREE from "../Core/three/three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.y = 1;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#7b6888",1.0);

document.body.appendChild(renderer.domElement);
const geometry = new THREE.CubeGeometry(1, 1, 1);
const material = new MeshBasicMaterial({color: 'steelblue'});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
function render() {
    requestAnimationFrame(render);
    //cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
}
render();