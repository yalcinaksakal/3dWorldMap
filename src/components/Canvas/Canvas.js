import { useEffect, useRef } from "react";
import setScene from "./SceneLib/setScene";

const Canvas = () => {
	const canvasRef = useRef();

	useEffect(() => {
		const { domElement, onResize } = setScene();
		canvasRef.current.appendChild(domElement);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			domElement.remove();
		};
	}, []);

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
