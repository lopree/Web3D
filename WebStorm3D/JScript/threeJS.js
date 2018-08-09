import * as THREE from "../Core/three/three";
let scene = new THREE.Scene();
let camera = new THREE .PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

let render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(render.domElement);
//Create Shape
let geo = new THREE.BoxGeometry(1,1,1);
let mat = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
let cube = new THREE.Mesh(geo,mat);
scene.add(cube);
camera.position.z = 3;
//Game Logic
let SceneUpdate = function(){
    cube.rotation.x+=0.01;
    cube.rotation.y+=3;
};
//Draw Scene
let renderer = function(){
    render.render(scene,camera);
};
//run GameLoop(renderer,update,repeat)
let GameLoop = function () {
    SceneUpdate();
    renderer();

    requestAnimationFrame(GameLoop);
};

GameLoop();