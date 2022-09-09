import styles from "./App.module.css";
import Canvas from "./components/Canvas/Canvas";

function App() {
	return (
		<div className={styles.home}>
			<Canvas />
		</div>
	);
}

export default App;
