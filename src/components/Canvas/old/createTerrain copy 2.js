import {
	InstancedMesh,
	Object3D,
	MeshBasicMaterial,
	Color,
	PlaneGeometry,
} from "three";

const createTerrainWithColors = (
	colors,
	width,
	height,
	heightMap,
	startPos = [0, 0]
) => {
	const planeGeo = new PlaneGeometry(1, 1),
		planeMaterial = new MeshBasicMaterial(),
		countOfobjects = width * height,
		terrain = new InstancedMesh(
			planeGeo.clone(),
			planeMaterial.clone(),
			countOfobjects
		),
		positionHelper = new Object3D(),
		setPositions = instancedMesh => {
			let x, y;
			for (let i = 0; i < countOfobjects; i++) {
				x = i % width;
				y = Math.floor(i / width);
				positionHelper.position.set(
					x - width / 2,
					heightMap[y][x] / 2,
					y - height / 2
				);
				positionHelper.updateMatrix();
				instancedMesh.setColorAt(
					i,
					new Color(`rgb(${colors[y][x].join(",")})`)
				);
				instancedMesh.setMatrixAt(i, positionHelper.matrix);
			}
		};
	positionHelper.rotateY(-Math.PI);
	positionHelper.rotateX(-Math.PI / 2);
	setPositions(terrain);
	terrain.instanceMatrix.needsUpdate = true;
	terrain.instanceColor.needsUpdate = true;
	return terrain;
};

export default createTerrainWithColors;
