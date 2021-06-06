import React from "react";
import Axios from "axios";
/* import "../../css/components/Recommendation.css"; */

const RecommendationSmall = (props) => {
	const { rankingList, handleAddition } = props;
	const [result, setResult] = React.useState([]);

	React.useEffect(() => {
		if (rankingList.length > 0) {
			Axios.get(
				`https://www.omdbapi.com/?s=${
					rankingList[rankingList.length - 1].Title
				}&apikey=1bacbed6&`
			).then((res) => {
				if (res.data.Search) setResult(res.data.Search);
			});
		}
	}, [rankingList]);

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
							<div className="col-md-12 col-lg-6">
								<div
									className="card"
									onClick={() => {
										handleAddition(item);
									}}
								>
									<div className="row no-gutters">
										<div className="col-4">
											<img src={item.Poster} className="card-img" alt="..." />
										</div>
										<div className="col-8">
											<div className="card-body">
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

export default RecommendationSmall;
