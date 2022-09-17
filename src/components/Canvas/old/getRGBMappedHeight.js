const deepest = 11000,
	highest = 9000;

const getRGBMappedHeight = val => {
	const res = [0, 0, 0, 255];
	let newVal = Math.floor(((val + deepest) * 765) / (deepest + highest)),
		i = 0;
	while (newVal > 0) {
		res[i] = newVal % 255;
		newVal -= res[i++];
	}
};

export default getRGBMappedHeight;
