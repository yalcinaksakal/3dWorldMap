import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { coordActions } from "../../store/coord-slice";

function DataFromFile() {
	const [file, setFile] = useState(),
		[isSubmitted, setIsSub] = useState(false),
		fileReader = new FileReader(),
		dispatch = useDispatch(),
		handleOnChange = e => setFile(e.target.files[0]),
		extractData = text => {
			const data = text
				.split(/\r?\n/)
				.map(row => row.split(" ").map(d => (isNaN(d) || !d ? 0 : +d)));
			data.pop();
			dispatch(coordActions.setData(data));
		},
		handleOnSubmit = e => {
			e.preventDefault();
			if (file) {
				setIsSub(true);
				fileReader.readAsText(file);
				fileReader.onload = function (event) {
					const text = event.target.result;
					extractData(text);
				};
			}
		};

	return (
		<div style={{ textAlign: "center" }}>
			{isSubmitted ? (
				<p>Extracting data...</p>
			) : (
				<form>
					<input
						type={"file"}
						id={"FileInput"}
						accept={".xyz"}
						onChange={handleOnChange}
					/>

					<button
						onClick={e => {
							handleOnSubmit(e);
						}}
					>
						IMPORT
					</button>
				</form>
			)}
		</div>
	);
}

export default DataFromFile;
