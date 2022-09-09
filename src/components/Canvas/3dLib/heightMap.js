const heightMap = async () => {
	const canvas = document.createElement("canvas");
	canvas.width = 250;
	canvas.height = 250;
	const ctx = canvas.getContext("2d");

	const image = new Image();
	image.src = "images/5.png";
	await image.decode();
	ctx.drawImage(image, 0, 0);
	let data;
	const width = image.width,
		height = image.height,
		map = [];
	for (let i = 0; i <= height; i++) {
		map[i] = [];
		for (let j = 0; j <= width; j++) {
			data = ctx.getImageData(j, i, 1, 1).data;
			data = data ? data[0] + data[1] + data[2] : 0;
			map[i].push(data / 30);
		}
	}
	return map;
};

export default heightMap;
