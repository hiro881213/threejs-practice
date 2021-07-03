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

    // マテリアルを生成する
    // MeshStandardMaterial
    //  物理ベースレンダリング
    //  → 光の反射など現実に近いマテリアルを再現する
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('../img/earth_texture.jpg')
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