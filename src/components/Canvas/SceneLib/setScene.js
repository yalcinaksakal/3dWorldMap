import { Color, Scene } from "three";
import createTerrain from "../3dLib/createTerrain";
import {
	myCam,
	createLights,
	setOrbitControls,
	createRenderer,
} from "./SceneElements";
import getHeightMap from "../3dLib/heightMap";

const setScene = () => {
	let renderRequested;
	const renderer = createRenderer(),
		camera = myCam([0, 500, 0]),
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

	scene.background = new Color("black");
	scene.add(...lights);
	controls.addEventListener("change", requestRenderIfNotRequested);

	// getColors().then(props => {
	// 	getHeightMap().then(map => {
	// 		scene.add(createTerrainWithColors(...props, map));
	// 		render();
	// 	});
	// });

	getHeightMap().then(props => {
		createTerrain(...props).then(terrain => {
			scene.add(terrain);
			render();
		});
	});

	return {
		domElement,
		onResize,
	};
};

export default setScene;
