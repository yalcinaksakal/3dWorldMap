const getWater = h => {
		const sat = -h / 11000;
		return [0, (1 - sat) / 3, 1 - sat];
	},
	getPlain = h => {
		const sat = h / 200;
		return [1 - sat / 3, 1 - sat / 3, sat / 5];
	},
	getGreen = h => {
		const sat = (h - 200) / 800;
		return [sat / 10, 1 - sat, sat / 10];
	},
	getBrown = h => {
		const sat = (h - 1000) / 1000;
		return [1 - sat, 1 - sat, 1 - (3 * sat) / 5];
	},
	getGray = h => {
		const sat = (h - 2000) / 3000;
		return [0.8 - sat, 0.8 - sat, 0.8 - sat];
	},
	getSnow = h => {
		const sat = (h - 4000) / 10000;
		return [0.5 + sat, 0.5 + sat, 0.5 + sat];
	},
	getBeach = () => [253 / 255, 253 / 255, 220 / 255],
	getColor = height => {
		const getFunc =
			height < 2 && height > -2
				? getBeach
				: height < 0
				? getWater
				: height < 200
				? getPlain
				: height < 1000
				? getGreen
				: height < 2000
				? getBrown
				: height < 4000
				? getGray
				: getSnow;
		return getFunc(height);
	};

export default getColor;
