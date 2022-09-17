import {
	MeshBasicMaterial,
	PlaneGeometry,
	Mesh,
	DoubleSide,
	BufferAttribute,
	MeshPhongMaterial,
} from "three";

const createTerrain = coords => {
	const geometry = new PlaneGeometry(201, 201, 199, 199),
		material = new MeshPhongMaterial({
			wireframe: false,
			side: DoubleSide,
			transparent: true,
			opacity: 0.5,
			// color: "gray",
			vertexColors: true,
		}),
		posArr = geometry.attributes.position.array;

	geometry.setAttribute(
		"color",
		new BufferAttribute(
			new Float32Array(geometry.attributes.position.count * 3),
			3
		)
	);
	const { color } = geometry.attributes;

	for (let i = 0; i < coords.length - 1; i++) {
		posArr[i * 3 + 2] = coords[i][2] / 50;
		color.setXYZ(i, i % 256, 255, 255);
	}

	geometry.attributes.position.needsUpdate = true;
	color.needsUpdate = true;

	const terrain = new Mesh(geometry, material);
	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);

	return terrain;
};

export default createTerrain;
