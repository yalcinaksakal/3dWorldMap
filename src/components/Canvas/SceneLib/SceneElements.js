import {
	PerspectiveCamera,
	DirectionalLight,
	AmbientLight,
	PointLight,
	PCFShadowMap,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const myCam = pos => {
		const aspect = window.innerWidth / window.innerHeight,
			fov = 70,
			near = 0.1,
			far = 10000.0,
			camera = new PerspectiveCamera(fov, aspect, near, far);
		camera.lookAt(0, 0, 0);
		camera.position.set(...pos);
		return camera;
	},
	createLights = () => {
		const directionalLight = new DirectionalLight("red", 0.8),
			pointLight = new PointLight("blue", 1);
		directionalLight.position.set(-500, 500, -500);
		directionalLight.target.position.set(0, 0, 0);

		pointLight.position.set(-200, 500, -200);
		pointLight.castShadow = true;
		pointLight.shadow.mapSize.width = 2048; // default
		pointLight.shadow.mapSize.height = 2048; // default
		pointLight.shadow.camera.near = 0.5; // default
		pointLight.shadow.camera.far = 5000; // default

		return [directionalLight, new AmbientLight("white", 0.2), pointLight];
		// return [];
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
	},
	createRenderer = () => {
		//set up renderer
		// const renderer = new WebGLRenderer({ antialias: true, alpha: true });
		const renderer = new WebGLRenderer({ antialias: true });
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFShadowMap;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		return renderer;
	};
