import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';
import * as GaussianSplats3D from 'https://cdn.jsdelivr.net/npm/@mkkellogg/gaussian-splats-3d/dist/gaussian-splats-3d.module.js';

// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

// OrbitControlsの追加
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);
controls.update();

// Splatシーンの追加
const viewer = new GaussianSplats3D.Viewer({
    threeScene: scene,
});

// Splatモデルを読み込む
viewer.addSplatScene('models/model.splat', {
    splatAlphaRemovalThreshold: 5,
    showLoadingUI: true,
    position: [0, 0, 0],
}).then(() => {
    viewer.start();
});

// ウィンドウサイズの変更に対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    viewer.update();
    controls.update(); // OrbitControlsの更新
    renderer.render(scene, camera);
}
animate();
