import "./style.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import car from "./assets/car.glb?url";
const canvasEl = document.querySelector("#main-canvas");

drawWater();

function drawWater() {
	if (!canvasEl) return;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(7, 4, 7);

	const renderer = new THREE.WebGLRenderer({
		canvas: canvasEl,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	const loader = new GLTFLoader();
	loader.load(
		car,
		function (gltf) {
			scene.add(gltf.scene);
		},
		undefined,
		function (error) {
			console.error(error);
		}
	);

	const light = new THREE.PointLight(0xffffff, 1500, 150);
	const secondLight = new THREE.PointLight(0xffffff, 1500, 150);
	light.position.set(15, 15, 8);
	secondLight.position.set(-15, 10, -8);
	const lightHelper = new THREE.PointLightHelper(light, 1);
	const secondLightHelper = new THREE.PointLightHelper(secondLight, 1);
	scene.add(light, secondLight, lightHelper, secondLightHelper);

	const gridHelper = new THREE.GridHelper(30, 30);
	scene.add(gridHelper);

	new OrbitControls(camera, renderer.domElement);

	function animate() {
		renderer.render(scene, camera);
	}
	renderer.setAnimationLoop(animate);
}
