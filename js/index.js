// サイズを指定
const width = 960;
const height = 540;
    

/**
 * オンロード関数
 */
window.onload = function() {
    // 立方体実行処理
    makeCube();
};

/**
 * 立方体生成処理
 */
const makeCube = () => {
    
    // WebGLを描画するためのレンダラを生成する
    const renderer = new THREE.WebGLRenderer({
        // 描画先のidを指定する
        canvas: document.querySelector('#myCanvas')
    });

    // デバイスの解像度をセットする
    renderer.setPixelRatio(window.devicePixelRatio);

    // レンダラのサイズを指定する
    renderer.setSize(width, height);

    // シーンを作成する
    // シーン:3D空間
    // → 3Dオブジェクトや光源の配置箇所になる

    const scene = new THREE.Scene();

    // カメラを作成する
    // 3Dオブジェクトの視点を表す。
    // 第一引数：画角
    // 第二引数：アスペクト比
    // 第三引数: 描画開始距離
    // 第四引数: 描画終了距離

    const camera = new THREE.PerspectiveCamera(45, width / height);

    // カメラ位置を設定する
    camera.position.set(0, 0, +1000);

    // ---------------------------------------------------
    // 3Dオブジェクト(メッシュ) = ジオメトリ + マテリアル
    // ---------------------------------------------------

    // ジオメトリを作成する
    // ジオメトリ:頂点や面情報を持っている
    // BoxGeometry:箱状の立体を作成する

    const geometry = new THREE.BoxGeometry(400,400,400);

    // マテリアルを作成する
    const material = new THREE.MeshNormalMaterial();

    // メッシュを作成する
    const box = new THREE.Mesh(geometry, material)

    // シーンに追加
    scene.add(box);

    // 毎フレーム時に実行されるループイベント
    const tickCube = () => {

        // アニメーションを設定する
        box.rotation.x -= 0.01;
        box.rotation.y += 0.01;
        box.rotation.z += 0.01;

        renderer.render(scene, camera); // レンダリング

        requestAnimationFrame(tickCube);
        
    }

    // 初回実行
    // Three.jsの表示結果を更新する
    // Three.jsでは自動的に画面が最新に切り替わらないので、明示的に画面が更新されるようにする
    tickCube();

}
