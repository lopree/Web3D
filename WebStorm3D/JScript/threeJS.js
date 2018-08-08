import * as THREE from "../Core/three/three";

const scene = new THREE.Scene();
const  camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

let render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth,window.innerHeight);
document.appendChild(render.domElement);

