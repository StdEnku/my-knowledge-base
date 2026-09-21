// js/script.js の先頭でCDNから直接インポートする
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

const scene = new THREE.Scene(); // シーンオブジェクト
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); // カメラオブジェクト

// HTML上のcanvas要素を取得
const canvas = document.getElementById('myCanvas');

// 取得したcanvasをレンダラーに渡す
const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas, 
  antialias: true, 
  alpha: true 
}); 

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // 高解像度ディスプレイ（Retina等）対応

const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    void main() {
      // 座標を中央基準にし、アスペクト比を補正
      vec2 uv = vUv - 0.5;
      uv.x *= u_resolution.x / u_resolution.y;

      // アニメーション速度（音楽サイトのアンビエントな雰囲気に合わせ極めてゆっくりに）
      float t = u_time * 0.2; 

      // 左右の端に向かって波がフェードアウトするマスク
      float fadeX = smoothstep(0.8, 0.1, abs(uv.x));

      // 背景色（ベースの暗闇）
      vec3 finalColor = vec3(0.01, 0.015, 0.03);

      // 5層の抽象的なラインを描画
      for(int i = 0; i < 5; i++) {
        float fi = float(i);
        
        // レイヤーごとに波のうねり方（周波数と速度）を変える
        float freq = 1.5 + fi * 0.6;
        float speed = 0.4 + fi * 0.15;
        float amp = 0.03 + fi * 0.012;
        
        // サイン波を組み合わせて滑らかで有機的な曲線を作る
        float y = sin(uv.x * freq + t * speed) * amp;
        y += cos(uv.x * (freq * 0.5) - t * (speed * 0.7)) * (amp * 0.8);
        
        // 線からの距離
        float dist = uv.y - y;
        float absDist = abs(dist);
        
        // 1. シャープな芯のライン（極細）
        float line = smoothstep(0.003, 0.0, absDist);
        
        // 2. 線の周りの柔らかな発光（グロー）
        float glow = smoothstep(0.04, 0.0, absDist) * 0.4;
        
        // 3. 波の下に伸びる、うっすらとしたヴェール（透明感のあるグラデーション）
        float veil = smoothstep(0.0, -0.15, dist) * smoothstep(-0.3, 0.0, dist) * 0.15;
        
        // レイヤーごとのカラー（奥は深い青、手前は洗練されたシアン）
        vec3 colorStart = vec3(0.05, 0.15, 0.40); // 落ち着いたネイビー
        vec3 colorEnd   = vec3(0.20, 0.60, 0.85); // 上品なシアン
        vec3 waveColor  = mix(colorStart, colorEnd, fi / 4.0);
        
        // 全てを合成し、左右のフェードマスクをかける
        float intensity = (line + glow + veil) * fadeX;
        
        // 加算合成のように色を重ねていく（光が重なる表現）
        finalColor += waveColor * intensity;
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});