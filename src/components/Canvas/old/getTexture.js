import { Color, DataTexture } from "three";
import getRGBMappedHeight from "./getRGBMappedHeight";

const getTexture = heights => {
	const size = heights.length,
		data = new Uint8Array(4 * size),
		color = new Color(0xffffff);

	for (let i = 0; i < size; i++) {
		const stride = i * 4,
			height = getRGBMappedHeight(heights[i]);
		for (let j = 0; j < 4; j++) data[stride + j] = height[j];
	}
	console.log(data);

	const texture = new DataTexture(new Uint8Array(4 * size), 201, 201);
	texture.needsUpdate = true;
	return texture;
};
export default getTexture;
