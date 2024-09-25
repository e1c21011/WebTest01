// src/loaders/SplatLoader.js
import * as THREE from "three";

class SplatLoader {
  load(url, onLoad, onError) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((data) => {
        const geometry = this.parse(data);
        onLoad(geometry);
      })
      .catch(onError);
  }

  parse(data) {
    // splatファイルの解析処理
    const geometry = new THREE.BufferGeometry();
    // ここにsplatファイルのデータをgeometryに変換する処理を追加
    // 例: 頂点データ、法線データなどをバッファに格納する

    return geometry;
  }
}

export { SplatLoader };
