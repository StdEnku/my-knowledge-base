const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  alert('WebGLがサポートされていません');
}

const programId = GetWaveEffectProgram();// 別エフェクトに切り替えたいならこの関数を変更する

const positionBufferId = gl.createBuffer();// vbo作成してvboのIDを返す。
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferId);// 先ほど作成したvboを操作対象にする。

// ローカル空間最大の四角面
const positions = new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0, 1.0,
  1.0, 1.0,
]);

gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);// vboに頂点情報を流し込む

gl.useProgram(programId);// プログラムの有効化

// 属性(attribute)と変数(uniform)のロケーションを取得
const a_positionVarID = gl.getAttribLocation(programId, "a_position");// シェーダーに渡す頂点のポジションId
const u_timeVarID = gl.getUniformLocation(programId, "u_time");// シェーダーに渡すuniform変数のポジションId
const u_resolutionVarID = gl.getUniformLocation(programId, "u_resolution");// シェーダーに渡すuniform変数のポジションId


gl.enableVertexAttribArray(a_positionVarID);// このシェーダー変数を頂点送信用に指定
gl.vertexAttribPointer(a_positionVarID, 2, gl.FLOAT, false, 0, 0);// 具体的な頂点データの並び方設定

/* 
  画面リサイズ時canvasのサイズも動的に変更する関数
*/
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
  gl.uniform2f(u_resolutionVarID, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初期化時に一度実行

/* 
  アニメーション用ループ
*/
function animate(time) {
  // 経過時間を秒単位に変換
  const timeInSeconds = time * 0.001;

  // Uniform変数の更新
  gl.uniform1f(u_timeVarID, timeInSeconds);

  // 描画
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(animate);
}

// アニメーション開始
requestAnimationFrame(animate);