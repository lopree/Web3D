//import * as THREE from "../Core/three/three";
let container,cube;
let scene,camera,render,controls,light;
let raycast,mouse;
let clock = new THREE.Clock();
let mixer;

init();
GameLoop();
function init(){
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    //scene and camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFFFFFF );
    camera = new THREE .PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 3;
    // envmap
    // let path = './Resources/cube/Bridge2/';
    // let format = '.jpg';
    // let envMap = new THREE.CubeTextureLoader().load( [
    //     path + 'posx' + format, path + 'negx' + format,
    //     path + 'posy' + format, path + 'negy' + format,
    //     path + 'posz' + format, path + 'negz' + format
    // ] );
    //Light
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
    light.position.set( 0, 1, 0 );
    scene.add( light );
    //OrbitControls(camera)，控制镜头
    controls = new THREE.OrbitControls(camera);
    controls.update();
    //Create Shape
    let geo = new THREE.BoxGeometry(1,1,1);
    let mat = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
    cube = new THREE.Mesh(geo,mat);
    scene.add(cube);
    //render and loader
    render = new THREE.WebGLRenderer(
        {
            //抗锯齿
            antialias: true
        }
    );
    let loader = new THREE.GLTFLoader();
    //设置GLTF模型的解压缩文件存放地址
    THREE.DRACOLoader.setDecoderPath('./draco');
    loader.setDRACOLoader( new THREE.DRACOLoader());
    loader.load(
        //模型地址
        './Resources/Models/Arm.gltf',
        function (gltf) {
            let model = gltf.scene;
            //获取动作
            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();
            // cycle over materials
            model.traverse(child => {
                //材质赋予
                if (child.material) {
                    child.material.needsUpdate = true;
                    child.material.flatShading = false;
                }
            });
            scene.add(model);
        },
        function(xhr){
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        });
    render.setSize(window.innerWidth,window.innerHeight);
    //Gamma 设置
    render.gammaFactor = 2.2;
    render.gammaOutput = true;
    //模型分辨率设置，启用后自适应设备的分辨率
    render.setPixelRatio( window.devicePixelRatio );
    container.appendChild(render.domElement);
    //窗口的自适应
    window.addEventListener( 'resize', onWindowResize, false );
    //添加光投射器 及 鼠标二维向量 用于捕获鼠标移入物体
    //下次渲染时，通过mouse对于的二维向量判断是否经过指定物体
    raycast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown',mouseDown,false)
}

function mouseDown(event){
    event.preventDefault();
    //转换坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycast.setFromCamera( mouse, camera );
    let intersects = raycast.intersectObjects( scene.children );
    if (intersects.length>0){
        let intersect = intersects[0];
        if (event.button===0) {
            showSVG();
        }
        renderer();
    }

}
function onWindowResize() {
    camera.aspect= window.innerWidth/window.innerHeight;
    //防止物体由于窗口的变换而形变
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth,window.innerHeight);
}
//Game Logic
function CubeAnimation(){
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.01;
}
//Draw Scene
function renderer(){
    let delta = clock.getDelta();
    if (mixer != null) {
        mixer.update(delta);
    }
    //THREE.GLTFLoader.Shaders.update(scene, camera);
    render.render(scene,camera);
}
//run GameLoop(renderer,update,repeat)
function GameLoop() {
    CubeAnimation();
    renderer();
    requestAnimationFrame(GameLoop);
}
function showSVG() {
    console.log(1);
    const deskTop = document.getElementsByClassName('svg-rooter');
    console.log(deskTop.style);
    deskTop.style.display = "block";
}

