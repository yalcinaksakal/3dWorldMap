import { configureStore } from "@reduxjs/toolkit";

import cordReducer from "./coord-slice";

const store = configureStore({
	reducer: {
		coords: cordReducer,
	},
});

export default store;
