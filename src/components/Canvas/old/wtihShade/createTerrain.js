import { PlaneGeometry, Mesh, ShaderMaterial, TextureLoader } from "three";
import { _FS } from "../shaders/_FS";
import { _VS } from "../shaders/_VS";

const createTerrain = async () => {
	const textureLoader = new TextureLoader(),
		bumpTexture = await textureLoader.load("ELE_0_0.tif"),
		geometry = new PlaneGeometry(225, 225, 256, 256),
		material = new ShaderMaterial({
			uniforms: {
				bumpTexture: {
					value: bumpTexture,
				},
				scale: { value: 300 },
			},
			vertexShader: _VS,
			fragmentShader: _FS,
			transparent: true,
			opacity: 0.8,
		}),
		terrain = new Mesh(geometry, material);
	console.log(bumpTexture);
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);
	return terrain;
};

export default createTerrain;
