const getHeightMap = async () => {
	const canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"),
		image = new Image(),
		map = [];

	image.src = "images/5.png";
	await image.decode();
	const width = image.width,
		height = image.height;

	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(image, 0, 0);

	for (let i = 0; i <= height; i++) {
		map[i] = [];
		for (let j = 0; j <= width; j++) {
			const { data } = ctx.getImageData(j, i, 1, 1);
			map[i].push(data[0] + data[1] + data[2]);
		}
	}

	return map;
};

export default getHeightMap;
