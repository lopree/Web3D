//import * as THREE from "../Core/three/three";
let container, cube;
let scene, camera, renderer, controls, light;
let raycast, mouse;
let clock = new THREE.Clock();
let mixer;

init();
GameLoop();

function init() {
    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    //light
    light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);
    //DirectionalLight
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    scene.add(light);
    // ground
    let mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false
    }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);
    let grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);
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
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(1, 5, 8);
    //OrbitControls(camera)，控制镜头
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    //窗口的自适应
    window.addEventListener('resize', onWindowResize, false);
    //添加光投射器 及 鼠标二维向量 用于捕获鼠标移入物体
    //下次渲染时，通过mouse对于的二维向量判断是否经过指定物体
    raycast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    //renderer.domElement.addEventListener('mousedown', mouseDown, false)
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
