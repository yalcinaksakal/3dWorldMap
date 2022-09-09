import {
	PlaneGeometry,
	MeshStandardMaterial,
	DoubleSide,
	Mesh,
	// Vector2,
} from "three";
import { DEGREE } from "../config/content";
import heightMap from "./heightMap";

//Plane
let plane;
/*
const modifyVertices = positions => {
  for (let i = 0; i < positions.length; i += 3) {
    //modify height
    positions[i + 2] = Math.ceil(Math.random() * 150) - 75;
  }
};
const modifyVerticesWithBump = positions => {
  let dist, height;
  const zeroVector = new Vector2(0, 0);
  for (let i = 0; i < positions.length; i += 3) {
    //modify height
    dist = zeroVector.distanceTo(new Vector2(positions[i], positions[i + 1]));
    height = 1 - dist / 1768;
    height = height * height * height * (height * (height * 6 - 15) + 10);
    positions[i + 2] = height * 1500;
  }
};
*/
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
};

const createPlane = async () => {
	plane = new Mesh(
		new PlaneGeometry(320, 160, 256, 256),
		new MeshStandardMaterial({
			color: "dodgerblue",
			// vertexColors: true,
			// transparent: true,
			// opacity: 0.5,
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
