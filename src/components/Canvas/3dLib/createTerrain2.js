import {
	PlaneGeometry,
	Mesh,
	DoubleSide,
	MeshBasicMaterial,
	BufferAttribute,
} from "three";
import getColor from "./getColor";

const createTerrain = coords => {
	const geometry = new PlaneGeometry(225, 225, 224, 224),
		material = new MeshBasicMaterial({
			side: DoubleSide,
			vertexColors: true,
			transparent: true,
			opacity: 1,
		}),
		posArr = geometry.attributes.position.array,
		colors = [];
	for (let i = 0; i < coords.length; i++) {
		posArr[i * 3 + 2] = coords[i][2] / 150;
		colors.push(...getColor(coords[i][2]));
	}
	geometry.setAttribute(
		"color",
		new BufferAttribute(new Float32Array(colors), 3)
	);

	const terrain = new Mesh(geometry, material);
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);
	return terrain;
};

export default createTerrain;
