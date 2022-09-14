import {
	InstancedMesh,
	Object3D,
	MeshBasicMaterial,
	BoxGeometry,
	Color,
} from "three";

const createTerrainWithColors = coords => {
	console.log(coords);
	const boxGeometry = new BoxGeometry(0.1, 0.1, 0.1),
		boxMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.2 }),
		countOfVertices = coords.length,
		terrain = new InstancedMesh(
			boxGeometry.clone(),
			boxMaterial.clone(),
			countOfVertices
		),
		positionHelper = new Object3D(),
		setPositions = instancedMesh => {
			let x = 0,
				y = 0,
				prevLat = coords[0][1];
			// coords = [longitude,latitude,height]
			for (let i = 0; i < countOfVertices; i++) {
				if (coords[i][1] !== prevLat) {
					y += 0.1;
					x = 0;
					prevLat = coords[i][1];
				}
				positionHelper.position.set(x, coords[i][2] / 100, y);
				x += 0.1;
				// positionHelper.scale.set(1, coords[i][2] / 50, 1);
				positionHelper.updateMatrix();
				instancedMesh.setColorAt(i, new Color(coords[i][2] % 256, 255, 255));
				instancedMesh.setMatrixAt(i, positionHelper.matrix);
			}
		};

	setPositions(terrain);
	terrain.position.set(0, 0, 0);
	terrain.instanceMatrix.needsUpdate = true;
	terrain.instanceColor.needsUpdate = true;
	return terrain;
};

export default createTerrainWithColors;
