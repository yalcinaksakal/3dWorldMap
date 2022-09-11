import {
	MeshBasicMaterial,
	Color,
	PlaneGeometry,
	Mesh,
	DoubleSide,
	TextureLoader,
} from "three";

const createTerrain = async (heightMap, width, height) => {
	const textureloader = new TextureLoader(),
		texture = await textureloader.load("images/Elle_0_0.tif"),
		material = new MeshBasicMaterial({
			// map: texture,
			wireframe: false,
			side: DoubleSide,
		}),
		terrain = new Mesh(
			new PlaneGeometry(width - 1, height - 1, 256, 256),
			material
		),
		posArr = terrain.geometry.attributes.position.array;

	// terrain.castShadow = true;
	// terrain.receiveShadow = true;
	// terrain.rotateX(-Math.PI / 2);

	// // terrain.material.side = DoubleSide;
	// terrain.position.set(0, 0, 0);
	// console.log(heightMap, width, height);
	// let x, y;
	// for (let i = 0; i < posArr.length; i += 3) {
	// 	x =
	// 		(posArr[i] < 0 ? Math.ceil(posArr[i]) : Math.floor(posArr[i])) +
	// 		width / 2;
	// 	y =
	// 		(posArr[i + 1] < 0
	// 			? Math.ceil(posArr[i + 1])
	// 			: Math.floor(posArr[i + 1])) +
	// 		height / 2;

	// 	posArr[i + 2] = heightMap[y][x];
	// }
	// terrain.geometry.attributes.position.needsUpdate = true;
	return terrain;
};

export default createTerrain;
