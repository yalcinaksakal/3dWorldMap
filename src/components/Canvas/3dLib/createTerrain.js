import {
	InstancedMesh,
	Object3D,
	MeshBasicMaterial,
	BoxGeometry,
	Color,
} from "three";

const createTerrainWithColors = (
	colors,
	width,
	height,
	heightMap,
	startPos = [0, 0]
) => {
	const boxGeometry = new BoxGeometry(1, 1, 1),
		boxMaterial = new MeshBasicMaterial(),
		countOfobjects = width * height,
		terrain = new InstancedMesh(
			boxGeometry.clone(),
			boxMaterial.clone(),
			countOfobjects
		),
		positionHelper = new Object3D(),
		setPositions = instancedMesh => {
			let x, y;
			for (let i = 0; i < countOfobjects; i++) {
				x = i % width;
				y = Math.floor(i / width);
				positionHelper.position.set(x - width / 2, 0, y - height / 2);
				positionHelper.scale.set(1, heightMap[y][x], 1);
				positionHelper.updateMatrix();
				instancedMesh.setColorAt(
					i,
					new Color(`rgb(${colors[y][x].join(",")})`)
				);
				instancedMesh.setMatrixAt(i, positionHelper.matrix);
			}
		};

	setPositions(terrain);
	terrain.instanceMatrix.needsUpdate = true;
	terrain.instanceColor.needsUpdate = true;
	return terrain;
};

export default createTerrainWithColors;
