import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null, isData: false };

const coordSlice = createSlice({
	name: "coords",
	initialState,
	reducers: {
		setData(state, action) {
			state.data = action.payload;
			state.isData = true;
		},
	},
});

export const coordActions = coordSlice.actions;
export default coordSlice.reducer;
