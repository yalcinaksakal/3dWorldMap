import { Color, Scene } from "three";
import createTerrain from "../3dLib/createTerrain";
import {
	myCam,
	createLights,
	setOrbitControls,
	createRenderer,
} from "./SceneElements";

const setScene = coords => {
	let renderRequested;
	const renderer = createRenderer(),
		camera = myCam([0, 500, 0]),
		scene = new Scene(),
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

	// scene.background = new Color(0x87ceeb);
	scene.background = new Color("black");

	scene.add(...createLights());
	controls.addEventListener("change", requestRenderIfNotRequested);

	// createTerrain().then(terrain => {
	// 	scene.add(terrain);
	// 	requestRenderIfNotRequested();
	// });
	scene.add(createTerrain(coords));
	requestRenderIfNotRequested();

	return {
		domElement,
		onResize,
	};
};

export default setScene;
