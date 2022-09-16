import { PlaneGeometry, Mesh, ShaderMaterial } from "three";
import { _FS } from "../shaders/_FS";
import { _VS } from "../shaders/_VS";

const createTerrain = coords => {
	const geometry = new PlaneGeometry(200, 200, 199, 199),
		material = new ShaderMaterial({
			uniforms: {
				heights: {
					value: coords.map(coord => coord[2]),
				},
			},
			vertexShader: _VS,
			fragmentShader: _FS,
			transparent: true,
			opacity: 0.4,
		}),
		terrain = new Mesh(geometry, material);

	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);
	console.log(material);
	return terrain;
};

export default createTerrain;
