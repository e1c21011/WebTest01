import * as THREE from 'https://cdn.skypack.dev/three';
import * as GaussianSplats3D from 'https://cdn.skypack.dev/@mkkellogg/gaussian-splats-3d';

// シーンのセットアップ
const scene = new THREE.Scene();
const viewer = new GaussianSplats3D.Viewer({
    threeScene: scene,
});

// Splatシーンの追加
viewer.addSplatScene('models/model.splat', {
    splatAlphaRemovalThreshold: 5,
    showLoadingUI: true,
    position: [0, 0, 0],
}).then(() => {
    viewer.start();
});

// Three.jsのレンダラーを追加
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

// ウィンドウサイズの変更に対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    viewer.camera.aspect = window.innerWidth / window.innerHeight;
    viewer.camera.updateProjectionMatrix();
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    viewer.update();
    viewer.render();
}
animate();
