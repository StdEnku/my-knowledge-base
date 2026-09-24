const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  alert('WebGLがサポートされていません');
}

const programId = createWaveEffectProgramI();// 別エフェクトに切り替えたいならこの関数を変更する

// ==========================================
// ポリゴンの頂点データを設定 (画面全体を覆う四角形)
// ==========================================
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Triangle Strip用の4頂点 (-1.0から1.0の正規化デバイス座標系)
const positions = new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0, 1.0,
  1.0, 1.0,
]);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// プログラムの有効化
gl.useProgram(programId);

// 属性(attribute)と変数(uniform)のロケーションを取得
const positionLocation = gl.getAttribLocation(programId, "a_position");
const uTimeLocation = gl.getUniformLocation(programId, "u_time");
const uResolutionLocation = gl.getUniformLocation(programId, "u_resolution");

// 頂点データの紐付け
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// ==========================================
// リサイズ処理 (高解像度対応)
// ==========================================
function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth * pixelRatio;
  const height = window.innerHeight * pixelRatio;

  canvas.width = width;
  canvas.height = height;

  // CSSサイズは画面サイズそのまま
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初期化時に一度実行

// ==========================================
// アニメーションループ
// ==========================================
function animate(time) {
  // 経過時間を秒単位に変換
  const timeInSeconds = time * 0.001;

  // Uniform変数の更新
  gl.uniform1f(uTimeLocation, timeInSeconds);

  // 描画
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(animate);
}

// アニメーション開始
requestAnimationFrame(animate);