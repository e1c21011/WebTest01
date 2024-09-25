import * as THREE from "three";
import { SplatLoader } from "./loaders/SplatLoader.js"; // SplatLoaderをインポート

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// ディレクショナルライトを追加
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Splatファイルの読み込み
const loader = new SplatLoader();
loader.load(
  "./src/models/model.splat",
  (geometry) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // カメラ位置の設定
    camera.position.z = 5;

    // アニメーションループ
    const animate = function () {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01; // 軸回転
      mesh.rotation.y += 0.01; // 軸回転
      renderer.render(scene, camera);
    };

    animate();
  },
  (error) => {
    console.error("Error loading Splat file:", error);
  }
);
