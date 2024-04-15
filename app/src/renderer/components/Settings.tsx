import { Chessboard } from "kokopu-react";
import { setData, getData } from "../UserData";

export function Settings(props: {
	pieceset: string;
	setPieceset(set: string): void;
	colorset: string;
	setColorset(set: string): void;
	arrow: string;
	setArrow(set: string): void;
}) {
	const piecesets = Chessboard.piecesets();
	const colorsets = Chessboard.colorsets();

	const root = document.documentElement;
	root.style.setProperty("--primary", colorsets[props.colorset].b);
	root.style.setProperty("--secondary", colorsets[props.colorset].w);
	root.style.setProperty("--blue_marker", colorsets[props.colorset].cb);
	root.style.setProperty("--green_marker", colorsets[props.colorset].cg);
	root.style.setProperty("--red_marker", colorsets[props.colorset].cr);
	root.style.setProperty("--yellow_marker", colorsets[props.colorset].cy);

	const handlePiecesetChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const newPieceset = event.target.value;
		props.setPieceset(newPieceset);
		setData("piece_set", newPieceset);
	};

	const handleColorsetChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const newColorset = event.target.value;
		props.setColorset(newColorset);
		setData("color_set", newColorset);
	};

	const handleArrowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newArrow = event.target.value;
		props.setArrow(newArrow);
		setData("arrow", newArrow);
	};

	return (
		<div id="settings">
			<select value={props.pieceset} onChange={handlePiecesetChange}>
				{Object.keys(piecesets).map((set) => (
					<option key={set} value={set}>
						{set}
					</option>
				))}
			</select>

			<select value={props.colorset} onChange={handleColorsetChange}>
				{Object.keys(colorsets).map((set) => (
					<option key={set} value={set}>
						{set}
					</option>
				))}
			</select>

			<select value={props.arrow} onChange={handleArrowChange}>
				<option value="">Disabled</option>
				<option value="R">Red</option>
				<option value="G">Green</option>
				<option value="B">Blue</option>
				<option value="Y">Yellow</option>
			</select>
		</div>
	);
}
