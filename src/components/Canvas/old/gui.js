import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const changeSceneParams = () => {
	const gui = new GUI(),
		API = {
			offsetX: 0,
			offsetY: 0,
			repeatX: 0.25,
			repeatY: 0.25,
			rotation: Math.PI / 4, // positive is counter-clockwise
			centerX: 0.5,
			centerY: 0.5,
		},
		updateUvTransform = (mesh, API) => {
			const texture = mesh.material.map;

			if (texture.matrixAutoUpdate === true) {
				texture.offset.set(API.offsetX, API.offsetY);
				texture.repeat.set(API.repeatX, API.repeatY);
				texture.center.set(API.centerX, API.centerY);
				texture.rotation = API.rotation; // rotation is around [ 0.5, 0.5 ]
			} else {
				// one way...
				//texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );

				// another way...
				texture.matrix
					.identity()
					.translate(-API.centerX, -API.centerY)
					.rotate(API.rotation) // I don't understand how rotation can preceed scale, but it seems to be required...
					.scale(API.repeatX, API.repeatY)
					.translate(API.centerX, API.centerY)
					.translate(API.offsetX, API.offsetY);
			}
		};

	gui
		.add(API, "offsetX", 0.0, 1.0)
		.name("offset.x")
		.onChange(updateUvTransform);
	gui
		.add(API, "offsetY", 0.0, 1.0)
		.name("offset.y")
		.onChange(updateUvTransform);
	gui
		.add(API, "repeatX", 0.25, 2.0)
		.name("repeat.x")
		.onChange(updateUvTransform);
	gui
		.add(API, "repeatY", 0.25, 2.0)
		.name("repeat.y")
		.onChange(updateUvTransform);
	gui
		.add(API, "rotation", -2.0, 2.0)
		.name("rotation")
		.onChange(updateUvTransform);
	gui
		.add(API, "centerX", 0.0, 1.0)
		.name("center.x")
		.onChange(updateUvTransform);
	gui
		.add(API, "centerY", 0.0, 1.0)
		.name("center.y")
		.onChange(updateUvTransform);
};
