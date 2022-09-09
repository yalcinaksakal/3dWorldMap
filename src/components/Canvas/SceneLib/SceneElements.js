import {
	PerspectiveCamera,
	DirectionalLight,
	AmbientLight,
	PointLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const aspect = window.innerWidth / window.innerHeight,
	fov = 60,
	near = 1.0,
	far = 10000.0,
	camera = new PerspectiveCamera(fov, aspect, near, far);

export const changeCamPos = newPos => {
		camera.position.set(-newPos / 4, newPos * 1.5, -newPos);
	},
	myCam = pos => {
		camera.position.set(-pos / 2, pos * 2, -pos / 2);
		return camera;
	},
	createLights = () => {
		const directionalLight = new DirectionalLight("white", 0.8),
			pointLight = new PointLight("white", 0.2);
		directionalLight.position.set(-500, 500, -500);
		directionalLight.target.position.set(0, 0, 0);

		pointLight.position.set(-200, 500, -200);
		pointLight.castShadow = true;
		pointLight.shadow.mapSize.width = 2048; // default
		pointLight.shadow.mapSize.height = 2048; // default
		pointLight.shadow.camera.near = 0.5; // default
		pointLight.shadow.camera.far = 5000; // default

		return [directionalLight, new AmbientLight("white", 0.2), pointLight];
	},
	setOrbitControls = (cam, el) => {
		const controls = new OrbitControls(cam, el);
		controls.target.set(0, 0, 0);
		// controls.autoRotate = true;
		// controls.autoRotateSpeed = 0.2;
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;
		controls.maxDistance = 5000;
		controls.minDistance = 2;

		return controls;
	};
