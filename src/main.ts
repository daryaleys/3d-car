import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const canvasEl = document.querySelector("#main-canvas");

drawWater();

function drawWater() {
	if (!canvasEl) return;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(40, 40, 40);

	const renderer = new THREE.WebGLRenderer({
		canvas: canvasEl,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// const geometry = new THREE.TorusKnotGeometry(10, 3, 60, 8);
	// const material = new THREE.MeshBasicMaterial({ color: 0xff11ff, wireframe: true });
	// const torus = new THREE.Mesh(geometry, material);
	// scene.add(torus);

	const gridHelper = new THREE.GridHelper(50, 50);
	scene.add(gridHelper);

	new OrbitControls(camera, renderer.domElement);

	function animate() {
		renderer.render(scene, camera);
	}
	renderer.setAnimationLoop(animate);
}
