import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
// Gaussian Splattingのモジュールをインポート
import { GaussianSplat } from 'https://cdn.jsdelivr.net/npm/@mkkellogg/gaussian-splats-3d/dist/gaussian-splats-3d.module.js';

// シーンの初期化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Gaussian Splattingのためのデータを準備
const splatData = []; // スプラットデータをここに配置

// スプラットを作成し、シーンに追加
const gaussianSplat = new GaussianSplat(splatData);
scene.add(gaussianSplat);

// カメラの位置を設定
camera.position.z = 5;

// アニメーションループ
const animate = function () {
    requestAnimationFrame(animate);
    gaussianSplat.update(); // スプラットの更新
    renderer.render(scene, camera);
};

// ウィンドウサイズ変更時の処理
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーション開始
animate();
