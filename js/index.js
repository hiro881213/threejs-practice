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
 * ジオメトリ表示処理
 */
const makeGeometry = () => {

    // ----------------------------------------
    // レンダラ生成処理
    // ----------------------------------------

    // レンダラを作成する
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    })

    // レンダラのサイズを設定する
    renderer.setSize(width, height);

    // ----------------------------------------
    // シーン生成処理
    // ----------------------------------------

    const scene = new THREE.Scene();

    // ----------------------------------------
    // カメラ設定処理
    // ----------------------------------------

    // カメラを生成する
    // 第一引数：画角
    // 第二引数：アスペクト比
    // 第三引数: 描画開始距離
    // 第四引数: 描画終了距離
    const camera = new THREE.PerspectiveCamera(45, width / height, 1,10000);
    
    // カメラ位置を設定する
    camera.position.set(0,500, +1000);

    // lookAtメソッド:どの位置からでも、指定された座標に強制的に追い続ける
    camera.lookAt(new THREE.Vector3(0,0,0));

    // ----------------------------------------------
    // コンテナ生成処理
    // ----------------------------------------------

    // Object3D
    //  複数のオブジェクトを格納する箱
    const container = new THREE.Object3D();
    
    // コンテナをシーンに描画する
    scene.add(container);
    
    // ----------------------------------------------
    // マテリアル生成処理
    // ----------------------------------------------

    // THREE.DoubleSide
    //  ジオメトリの両面にマテリアルを描画する
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    });

    // ----------------------------------------------
    // 平行光源生成処理
    // ----------------------------------------------
    
    const directionalLight = new THREE.DirectionalLight(0xffffff);

    // 平行光源の位置を設定する
    directionalLight.position.set(1,1,1);

    // 平行光源をシーンに配置する
    scene.add(directionalLight);

    // ----------------------------------------------
    // 環境光生成処理
    // ----------------------------------------------

    // ・環境光源
    //    対象に均等に光を当てる
    // ・AmbientLignt
    //    環境光源を生成するメソッド

    const ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // ----------------------------------------------
    // ジオメトリ生成処理
    // ----------------------------------------------

    const geometryList =[
        new THREE.SphereGeometry(50),           // 球体
        new THREE.BoxGeometry(100,100,100),     // 直方体
        new THREE.PlaneGeometry(100,100),       // 平面
        new THREE.TetrahedronGeometry(100,0),   // カプセル形状 
        new THREE.ConeGeometry(100,100,32),     // 三角錐
        new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
        new THREE.TorusGeometry(50, 30, 16, 100)     // ドーナツ形状
    ];

    geometryList.map((geometry,index) => {

        // 形状とマテリアルからメッシュを生成する
        const mesh = new THREE.Mesh(geometry, material);

        // コンテナにメッシュを配置する
        // → 3D表示インスタンスのsceneプロパティが3D表示空間になる
        container.add(mesh);

        // 円周上に配置
        mesh.position.x = 400 * Math.sin((index / geometryList.length) * Math.PI * 2);
        mesh.position.z = 400 * Math.cos((index / geometryList.length) * Math.PI * 2);

    });

    /**
     * マテリアル用のアニメーション
     */
    const tickGeometry = () => {

        // メッシュを回転させる
        container.rotation.y += 0.01;
        container.rotation.x += 0.01;
        container.rotation.z += 0.01;

        // レンダリングを実行する
        renderer.render(scene, camera);

        // アニメーションにする
        requestAnimationFrame(tickGeometry);

    }

    // アニメーション
    tickGeometry();

}
