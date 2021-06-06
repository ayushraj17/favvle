import React from "react";

export default function CreateRank({ Ranking, handleRemoval, handleSorting }) {
	return (
		<div className="container-createRank d-flex align-items-start">
			<div className="row row-cards d-flex align-items-start">
				<div className="col-4 col-lg-3 d-flex justify-content-start align-items-center flex-column">
					<div className="card card-fixed">
						<img src="Images/rank-creation/Icon_add.svg" alt="" />
					</div>
				</div>

				{Ranking.map((value, i) => (
					<div
						className="col-4 col-lg-3 d-flex justify-content-center align-items-center flex-column"
						key={i + "1244"}
					>
						<div
							className="card"
							draggable="true"
							id={i}
							onDragStart={(e) => {
								e.dataTransfer.setData("Text/txt", i);
							}}
							onDrop={(e) => {
								e.preventDefault();
								let pElement;

								if (
									e.target.classList.contains("card-img-top") ||
									e.target.classList.contains("card-body")
								) {
									pElement = e.target.closest(".card");
								}
								var data2 = e.dataTransfer.getData("Text/txt");
								let id1 = parseInt(data2);
								let id2 = parseInt(pElement.id);
								console.log(id1, id2);
								handleSorting(id1, id2);
							}}
							onDragOver={(e) => {
								e.stopPropagation();
								e.preventDefault();
							}}
							onClick={() => handleRemoval(value)}
						>
							<img src={value?.Poster} className="card-img-top"></img>
							<div className="card-body">
								<h5
									className="card-title"
									style={{ overflow: "hidden", padding: 1, marginTop: -18 }}
								>
									{value.Title.length > 20
										? value.Title.substring(0, 22) + "..."
										: value.Title}
								</h5>
							</div>
						</div>
						<p className="txt-identifier">{i + 1}</p>
					</div>
				))}
			</div>
		</div>
	);
}
