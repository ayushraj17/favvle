import React from "react";
import Axios from "axios"; /* 
import "../../css/components/Recommendation.css"; */
import useCategory from "../../../functionalities/useCategory";

const Recommendation = (props) => {
	const { rankingList, handleAddition } = props;
	const [result, setResult] = React.useState([]);

	const { getOptionsByCategory, results } = useCategory();

	React.useEffect(() => {
		if (rankingList.length > 0) {
			// Axios.get(`https://www.omdbapi.com/?s=${rankingList[rankingList.length-1].Title}&apikey=1bacbed6&`)
			getOptionsByCategory(rankingList[rankingList.length - 1].Title);
		}
	}, [rankingList]);

	React.useEffect(() => {
		setResult(results);
	}, [results]);

	return (
		<div className="row container-recommendation">
			{rankingList.length === 0 ? (
				<div style={{ height: 100, display: "flex", alignItems: "center" }} />
			) : (
				<div
					style={{
						width: 450,
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				>
					{result.map((item, i) => {
						return (
							<div
								className="col-md-12 col-lg-6"
								id={i}
								onDragStart={(e) => {
									var data = JSON.stringify(item);
									e.dataTransfer.setData("Text/html", data);
								}}
								draggable="true"
							>
								<div
									className="card"
									onClick={() => {
										handleAddition(item);
									}}
								>
									<div className="row no-gutters d-flex align-items-center">
										<div className="col-md-4">
											<img src={item.Poster} className="card-img" alt="..." />
										</div>
										<div className="col-md-8">
											<div className="card-body d-flex justify-content-center align-items-center">
												<p className="card-text">{item.Title}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Recommendation;
