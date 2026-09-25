const canvas = document.getElementById('myCanvas');
// 1. WebGL2のコンテキストを取得する
const gl = canvas.getContext('webgl2');

if (!gl) {
  alert('WebGL 2がサポートされていません');
}

// 別エフェクトに切り替えたいならこの関数を変更する
// ※注意: シェーダーコード側も WebGL2 (#version 300 es) で書かれている必要があります
const programId = GetWaveEffectProgram(); 

// 2. VAO (Vertex Array Object) の作成とバインド
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// VBO作成してVBOのIDを返す
const positionBufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferId); // VBOを操作対象にする

// ローカル空間最大の四角面
const positions = new Float32Array([
  -1.0, -1.0,
   1.0, -1.0,
  -1.0,  1.0,
   1.0,  1.0,
]);

gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW); // VBOに頂点情報を流し込む

// 属性(attribute)のロケーションを取得
const a_positionVarID = gl.getAttribLocation(programId, "a_position");

// 3. VAOにVBOと頂点属性の紐づけ設定を記録する
gl.enableVertexAttribArray(a_positionVarID);
gl.vertexAttribPointer(a_positionVarID, 2, gl.FLOAT, false, 0, 0);

// VAOとVBOのバインドを解除（安全のため。描画ループ内で再度バインドします）
gl.bindVertexArray(null);
gl.bindBuffer(gl.ARRAY_BUFFER, null);


gl.useProgram(programId); // プログラムの有効化

// 変数(uniform)のロケーションを取得
const u_timeVarID = gl.getUniformLocation(programId, "u_time");
const u_resolutionVarID = gl.getUniformLocation(programId, "u_resolution");

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

  // 4. 描画時にVAOをバインドするだけで、頂点属性の設定が復元される
  gl.bindVertexArray(vao);

  // 描画
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // （任意）バインド解除
  gl.bindVertexArray(null);

  requestAnimationFrame(animate);
}

// アニメーション開始
requestAnimationFrame(animate);