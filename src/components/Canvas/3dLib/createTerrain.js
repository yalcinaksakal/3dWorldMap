import {
	MeshBasicMaterial,
	PlaneGeometry,
	Mesh,
	DoubleSide,
	TextureLoader,
	Float32BufferAttribute,
} from "three";

const createTerrain = coords => {
	const // textureloader = new TextureLoader(),
		// 	dimension = Math.ceil(coords.length ** 0.5),
		// texture = await textureloader.load("images/Elle_0_0.tif"),
		terrain = new Mesh(
			new PlaneGeometry(201, 201, 199, 199),
			new MeshBasicMaterial({
				// map: texture,
				wireframe: false,
				side: DoubleSide,
				// color: "gray",
				transparent: true,
				opacity: 0.5,
			})
		),
		colors = [],
		posArr = terrain.geometry.attributes.position.array;
	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotateX(-Math.PI / 2);
	terrain.position.set(0, 0, 0);

	for (let i = 0; i < coords.length - 1; i++) {
		posArr[i * 3 + 2] = coords[i][2] / 50;
		colors.push(Math.random() * 255, Math.random() * 255, Math.random() * 255);
	}

	terrain.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	terrain.geometry.attributes.position.needsUpdate = true;
	terrain.geometry.attributes.color.needsUpdate = true;
	console.log(terrain.geometry.attributes);
	return terrain;
};

export default createTerrain;
