import "./style.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import car from "./assets/car.glb?url";

const canvasEl = document.querySelector("#main-canvas"),
	switchBtn = document.querySelector("#switch"),
	currentAnimationEl = document.querySelector("#current-animation");

init();

function init() {
	if (!canvasEl) return;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(7, 4, 7);

	const renderer = new THREE.WebGLRenderer({
		canvas: canvasEl,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	let mixer: THREE.AnimationMixer,
		clips: THREE.AnimationClip[] = [],
		currentAnimation: number = 1,
		modelLoaded: boolean = false;

	const loader = new GLTFLoader();
	loader.load(
		car,
		function (gltf) {
			mixer = new THREE.AnimationMixer(gltf.scene);
			clips = gltf.animations;
			console.log(clips);

			mixer.clipAction(clips[currentAnimation]).play();
			if (currentAnimationEl) currentAnimationEl.textContent = clips[currentAnimation].name;

			scene.add(gltf.scene);
			modelLoaded = true;

			if (switchBtn)
				switchBtn.addEventListener("click", () => {
					mixer.clipAction(clips[currentAnimation]).stop();

					if (currentAnimation < clips.length - 1) currentAnimation++;
					else currentAnimation = 0;
					mixer.clipAction(clips[currentAnimation]).play();

					if (currentAnimationEl) currentAnimationEl.textContent = clips[currentAnimation].name;
				});
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
	scene.add(light, secondLight);

	const gridHelper = new THREE.GridHelper(30, 30);
	scene.add(gridHelper);

	new OrbitControls(camera, renderer.domElement);

	let clock = new THREE.Clock();
	clock.autoStart = true;

	function animate() {
		renderer.render(scene, camera);

		let delta = clock.getDelta();
		if (modelLoaded && mixer) mixer.update(delta);
	}
	renderer.setAnimationLoop(animate);
}
