const getColors = async () => {
	const canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"),
		image = new Image(),
		colors = [];

	image.src = "images/6.png";
	await image.decode();
	const width = image.width,
		height = image.height;

	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(image, 0, 0);

	for (let i = 0; i < height; i++) {
		colors[i] = [];
		for (let j = 0; j < width; j++) {
			const { data } = ctx.getImageData(j, i, 1, 1);
			colors[i].push([data[0], data[1], data[2]]);
		}
	}

	return [colors, width, height];
};

export default getColors;
