import {
	MeshBasicMaterial,
	Color,
	PlaneGeometry,
	Mesh,
	DoubleSide,
	TextureLoader,
} from "three";

const createTerrain = coords => {
	const textureloader = new TextureLoader(),
		dimension = Math.floor(coords.length ** 0.5),
		// texture = await textureloader.load("images/Elle_0_0.tif"),
		terrain = new Mesh(
			new PlaneGeometry(dimension * 50, dimension * 50, dimension, dimension),
			new MeshBasicMaterial({
				// map: texture,
				wireframe: false,
				side: DoubleSide,
				color: "gray",
				transparent: true,
				opacity: 0.5,
			})
		),
		posArr = terrain.geometry.attributes.position.array;

	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotateX(-Math.PI / 2);
	// terrain.material.side = DoubleSide;
	terrain.position.set(0, 0, 0);
	console.log(coords, posArr.length, dimension);
	let j = 0;
	for (let i = 0; i < posArr.length; i += 3) {
		// posArr[i] = coords[j][0];
		// posArr[j] = coords[j][1];
		posArr[i + 2] = coords[j++][2];
		if (j >= coords.length) break;
	}
	terrain.geometry.attributes.position.needsUpdate = true;
	return terrain;
};

export default createTerrain;
