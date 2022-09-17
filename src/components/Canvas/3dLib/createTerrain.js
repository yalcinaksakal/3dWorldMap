import {
	PlaneGeometry,
	Mesh,
	DoubleSide,
	MeshBasicMaterial,
	BufferAttribute,
} from "three";

const createTerrain = coords => {
	const geometry = new PlaneGeometry(201, 201, 199, 199),
		material = new MeshBasicMaterial({
			side: DoubleSide,
			transparent: true,
			opacity: 0.9,
			vertexColors: true,
		}),
		posArr = geometry.attributes.position.array,
		colors = [];
	for (let i = 0; i < coords.length; i++) {
		posArr[i * 3 + 2] = coords[i][2] / 50;
		colors.push(Math.random(), Math.random(), Math.random());
	}
	geometry.setAttribute(
		"color",
		new BufferAttribute(new Float32Array(colors), 3)
	);

	const terrain = new Mesh(geometry, material);
	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);

	return terrain;
};

export default createTerrain;
