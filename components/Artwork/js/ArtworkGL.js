import * as THREE from "three";
import { WebGLRenderer } from "three";

export default class ArtworkGL{
    constructor(props) {
        this.w = window.innerWidth;
        this.h = window.innerHeight;

    // レンダラーを作成
        this.renderer = new WebGLRenderer({alpha:true});
        this.renderer.setSize(this.w, this.h);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // #canvas-containerにレンダラーのcanvasを追加
        const container = document.getElementById("canvas-container");
        container.appendChild(this.renderer.domElement);

        // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
        this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 10);
        this.camera.position.z = 3;// カメラを遠ざける

        this.scene = new THREE.Scene();

        this.light = new THREE.PointLight(0x00ffff);
        this.light.position.set(2, 2, 2);// ライトの位置を設定

        // ライトをシーンに追加
        this.scene.add(this.light);

        // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
        const geo = new THREE.BoxGeometry(1, 1, 1);

        // マテリアルを作成
        const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });

        // ジオメトリとマテリアルからメッシュを作成
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.rotation.x = THREE.Math.DEG2RAD * 45;
        this.mesh.rotation.y = THREE.Math.DEG2RAD * 45;


        // メッシュをシーンに追加
        this.scene.add(this.mesh);

        // 画面に表示
        this.render();
    }

    render() {
        requestAnimationFrame(() => { this.render(); });

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
};