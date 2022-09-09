import { Color, Scene } from "three";
import {
	myCam,
	createLights,
	setOrbitControls,
	createRenderer,
} from "./SceneElements";

const setScene = () => {
	const renderer = createRenderer(),
		camera = myCam(1250),
		scene = new Scene(),
		lights = createLights(),
		{ domElement } = renderer,
		controls = setOrbitControls(camera, domElement),
		render = () => {
			if (renderRequested) renderRequested = undefined;
			controls.update();
			renderer.render(scene, camera);
		},
		requestRenderIfNotRequested = () => {
			if (!renderRequested) {
				renderRequested = true;
				requestAnimationFrame(render);
			}
		},
		onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			requestRenderIfNotRequested();
		};
	let renderRequested;

	scene.background = new Color("#748B97");
	scene.add(...lights);
	controls.addEventListener("change", requestRenderIfNotRequested);

	render();

	return {
		domElement,
		onResize,
	};
};

export default setScene;
