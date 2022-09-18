import { useSelector } from "react-redux";
import styles from "./App.module.css";
import Canvas from "./components/Canvas/Canvas";
import DataFromFile from "./components/FileReader/FilerReader";

function App() {
	const { isData } = useSelector(store => store.coords);

	return <Canvas />;
	// return (
	// 	<div className={styles.home}>{isData ? <Canvas /> : <DataFromFile />}</div>
	// );
}

export default App;
