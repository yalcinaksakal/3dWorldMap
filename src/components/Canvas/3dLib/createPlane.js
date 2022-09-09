import { PlaneGeometry, MeshStandardMaterial, DoubleSide, Mesh } from "three";
import { DEGREE } from "../../../config/consts";
import heightMap from "./heightMap";

const modifyVerticesWithHeightMap = async positions => {
		const map = await heightMap(),
			columns = map[0].length,
			rows = map.length;
		let indexOfPixelsZcord;
		for (let i = 0; i < rows; i++)
			for (let j = 0; j < columns; j++) {
				indexOfPixelsZcord = (i * columns + j) * 3 + 2;
				positions[indexOfPixelsZcord] = map[i][j];
			}
	},
	createPlane = async () => {
		const plane = new Mesh(
			new PlaneGeometry(320, 160, 256, 256),
			new MeshStandardMaterial({
				color: "green",
			})
		);

		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.rotation.x = -90 * DEGREE;
		plane.material.side = DoubleSide;
		plane.position.set(0, 0, 0);

		await modifyVerticesWithHeightMap(plane.geometry.attributes.position.array);

		return plane;
	};

export default createPlane;
