import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import setScene from "./SceneLib/setScene";

const Canvas = () => {
	const canvasRef = useRef(),
		{ data } = useSelector(store => store.coords);

	useEffect(() => {
		const { domElement, onResize } = setScene(data);
		canvasRef.current.appendChild(domElement);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			domElement.remove();
		};
	}, [data]);

	return (
		<div
			ref={canvasRef}
			style={{
				width: "100%",
				height: "100%",
			}}
		></div>
	);
};

export default Canvas;
