import { PlaneGeometry, Mesh, ShaderMaterial } from "three";

import { _FS } from "../shaders/_FS";
import { _VS } from "../shaders/_VS";

const createTerrain = coords => {
	const geometry = new PlaneGeometry(225, 225, 224, 224),
		material = new ShaderMaterial({
			uniforms: {},
			vertexShader: _VS,
			fragmentShader: _FS,
			transparent: true,
			opacity: 0.8,
		}),
		posArr = geometry.attributes.position.array;

	for (let i = 0; i < coords.length; i++)
		posArr[i * 3 + 2] = coords[i][2] / 150;

	const terrain = new Mesh(geometry, material);
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);
	return terrain;
};

export default createTerrain;
