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

/**
 * マテリアル生成処理
 */

const makeMaterial = () => {

    // ---------------------------------------------------
    // レンダラ設定処理
    // ---------------------------------------------------

    // レンダラ生成処理
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });

    // デバイスの解像度をセットする
    renderer.setPixelRatio(window.devicePixelRatio);

    // レンダラのサイズをセットする
    renderer.setSize(width,height);

    // ---------------------------------------------------
    // シーン生成処理
    // ---------------------------------------------------

    const scene = new THREE.Scene();

    // ---------------------------------------------------
    // カメラ設定処理
    // ---------------------------------------------------

    // カメラを生成処理(画角:45,アスペクト比 width/height)
    const camera = new THREE.PerspectiveCamera(45, width/height);

    // カメラ位置を設定する
    camera.position.set(0, 0, +1000);

    // ---------------------------------------------------
    // 球体設定処理
    // ---------------------------------------------------

    // ジオメトリ(形状:球体)を生成する
    // 第一引数: 半径
    // 第二引数: 経度分割数
    // 第三引数: 緯度分割数
    const geometry = new THREE.SphereGeometry(300,30,30);

    // 画像読み込みメソッドを取得する
    const loader = new THREE.TextureLoader();

    // テクスチャ画像を設定する
    const texture = loader.load('../img/earth_texture.jpg');

    // マテリアルを生成する
    // MeshStandardMaterial
    //  物理ベースレンダリング
    //  → 光の反射など現実に近いマテリアルを再現する
    const material = new THREE.MeshStandardMaterial({
        map: texture
    });

    // メッシュを生成する
    const mesh = new THREE.Mesh(geometry,material);

    // メッシュをシーンに描画する
    scene.add(mesh);

    // ---------------------------------------------------
    // 光源設定処理
    // ---------------------------------------------------

    // 平行光源を生成する
    // 平行光源
    //   無限遠にある平行な光源の光のため、影はオブジェクトの位置に影響されない
    // 第一引数: hex:色 光源の色を16進数色コードで設定する
    // 第二引数: intensity:光の強さ 光の強さが他のオブジェクトへ与える影響の強さを指定する
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1.5);

    // 光源の位置を設定する
    directionalLight.position.set(1,1,1);

    // 光源をメッシュに描画する
    scene.add(directionalLight);

    /**
     * マテリアル用のアニメーション
     */
    const tickMaterial = () => {

        // メッシュをy軸方向で回転させる
        mesh.rotation.y += 0.01

        // レンダリングを実行する
        renderer.render(scene, camera);

        // アニメーションにする
        requestAnimationFrame(tickMaterial);

    }

    // アニメーション
    tickMaterial();

};


