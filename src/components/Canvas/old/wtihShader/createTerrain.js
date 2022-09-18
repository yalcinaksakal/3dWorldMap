import { PlaneGeometry, Mesh, ShaderMaterial, TextureLoader } from "three";
import { _FS } from "../shaders/_FS";
import { _VS } from "../shaders/_VS";

const createTerrain = async () => {
	const textureLoader = new TextureLoader(),
		bumpTexture = await textureLoader.load("map.png"),
		geometry = new PlaneGeometry(600, 600, 1024, 1024),
		material = new ShaderMaterial({
			uniforms: {
				bumpTexture: {
					value: bumpTexture,
				},
				scale: { value: 3 },
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
