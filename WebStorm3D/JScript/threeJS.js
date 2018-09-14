//import * as THREE from "../Core/three/three";
let container, cube;
let scene, camera, renderer, controls, light;
let raycast, mouse;
let clock = new THREE.Clock();
let mixer;

init();
GameLoop();

function init() {
    //scene and camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    //Light
    light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
    light.position.set(0, 1, 0);
    scene.add(light);
    //Create Shape
    let geo = new THREE.BoxGeometry(1, 1, 1);
    let mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
    cube = new THREE.Mesh(geo, mat);
    scene.add(cube);
    //render and loader
    renderer = new THREE.WebGLRenderer(
        {
            //抗锯齿
            antialias: true
        }
    );
    let loader = new THREE.GLTFLoader();
    //设置GLTF模型的解压缩文件存放地址
    THREE.DRACOLoader.setDecoderPath('./draco');
    loader.setDRACOLoader(new THREE.DRACOLoader());
    let clock = new THREE.Clock();
    loader.load(
        //模型地址
        './Resources/Models/ExampleModel.gltf',
        function (OBJ) {
            let model = OBJ.scene;
            //获取动作
            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(OBJ.animations[0]).play();
            //cycle over materials
            model.traverse(child => {
                //材质赋予
                if (child.material) {
                    child.material.needsUpdate = true;
                    child.material.flatShading = false;
                }
            });
            scene.add(model);
            console.log(clock.getDelta());
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Gamma 设置
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    //模型分辨率设置，启用后自适应设备的分辨率
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    //camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    //OrbitControls(camera)，控制镜头
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    //窗口的自适应
    window.addEventListener('resize', onWindowResize, false);
    //添加光投射器 及 鼠标二维向量 用于捕获鼠标移入物体
    //下次渲染时，通过mouse对于的二维向量判断是否经过指定物体
    raycast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    renderer.domElement.addEventListener('mousedown', mouseDown, false)
}

//鼠标点击事件
function mouseDown(event) {
    event.preventDefault();
    //转换坐标
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycast.setFromCamera(mouse, camera);
    let intersects = raycast.intersectObjects(scene.children);
    if (intersects.length > 0) {
        let intersect = intersects[0];
        if (event.button === 0) {
            showSVG();
        }
        render();
    }
}

//窗口自适应
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //防止物体由于窗口的变换而形变
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//Game Logic
function CubeAnimation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

//Draw Scene
function render() {
    let delta = clock.getDelta();
    if (mixer != null) {
        mixer.update(delta);
    }
    //THREE.GLTFLoader.Shaders.update(scene, camera);
    renderer.render(scene, camera);
}

//run GameLoop(renderer,update,repeat)
function GameLoop() {
    CubeAnimation();
    requestAnimationFrame(GameLoop);
    controls.update();
    render();

}

//展示对应SVG,
function showSVG() {
    //原生查找并修改CSS中style的方法
    const deskTop = document.getElementsByClassName('svg-rooter');
    deskTop[0].style.display = 'block';
    //通过D3方法修改style
    // const deskTop = d3.select('.svg-rooter');
    // deskTop.style('display','block');
}
