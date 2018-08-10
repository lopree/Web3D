//import * as THREE from "../Core/three/three";
let scene,camera,render,controls,light;
scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
camera = new THREE .PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(render.domElement);
//窗口的自适应
window.addEventListener('resize',function () {
    const width = window.innerWidth;
    const  height = window.innerHeight;
    render.setSize(width,height);
    camera.aspect= width/height;
    //防止物体由于窗口的变换而形变
    camera.updateProjectionMatrix();
});
//OrbitControls(camera)，控制镜头
controls = new THREE.OrbitControls(camera,render.domElement);
controls.update();
//Light
light = new THREE.HemisphereLight(0xFFFFFF,0x444444);
light.position.set( 0, 200, 0 );
scene.add( light );

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 200, 100 );
light.castShadow = true;
light.shadow.camera.top = 180;
light.shadow.camera.bottom = -100;
light.shadow.camera.left = -120;
light.shadow.camera.right = 120;
scene.add( light );
//Create Shape
let geo = new THREE.BoxGeometry(1,1,1);
let mat = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
let cube = new THREE.Mesh(geo,mat);
scene.add(cube);
camera.position.z = 3;
//loader
let loader = new THREE.GLTFLoader();

THREE.DRACOLoader.setDecoderPath('./draco');
loader.setDRACOLoader( new THREE.DRACOLoader());

loader.load(
    './Resources/Models/SittingMan.gltf',
    function (gltf) {
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    function(xhr){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function(error){
        console.log("an error happend");
    });
//Game Logic
let SceneUpdate = function(){
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.01;
};
//Draw Scene
let renderer = function(){
    //THREE.GLTFLoader.Shaders.update(scene, camera);
    render.render(scene,camera);
};
//run GameLoop(renderer,update,repeat)
let GameLoop = function () {
    SceneUpdate();
    renderer();

    requestAnimationFrame(GameLoop);
};

GameLoop();