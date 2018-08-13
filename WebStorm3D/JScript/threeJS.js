//import * as THREE from "../Core/three/three";
let scene,camera,render,controls,light;
let clock = new THREE.Clock();
let mixer;
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
light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
light.position.set( 0, 1, 0 );
scene.add( light );

//Create Shape
let geo = new THREE.BoxGeometry(1,1,1);
let mat = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
let cube = new THREE.Mesh(geo,mat);
scene.add(cube);
camera.position.z = 3;
//loader
let loader = new THREE.GLTFLoader();
//设置GLTF模型的解压缩文件，实例化
THREE.DRACOLoader.setDecoderPath('./draco');
loader.setDRACOLoader( new THREE.DRACOLoader());

loader.load(
    //模型地址
    './Resources/Models/Arm.gltf',
    function (gltf) {
        let model = gltf.scene;
        scene.add(model);
        //获取动作
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        // cycle over materials
        model.traverse(child => {
                if (child.material) {
                    child.material.needsUpdate = true;
                    child.material.flatShading = false;
                }

        });

        renderer();
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
    let delta = clock.getDelta();
    if (mixer != null) {
        mixer.update(delta);
    }
    //THREE.GLTFLoader.Shaders.update(scene, camera);
    render.gammaFactor = 2.2;


    render.render(scene,camera);
};
render.gammaOutput = true;
//run GameLoop(renderer,update,repeat)
let GameLoop = function () {
    SceneUpdate();
    renderer();
    requestAnimationFrame(GameLoop);
};

GameLoop();