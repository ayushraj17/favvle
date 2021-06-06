if (process.browser) {
	function getStyle(el, styleProp) {
		if (el.currentStyle) {
			return el.currentStyle[styleProp];
		}

		return document.defaultView.getComputedStyle(el, null)[styleProp];
	}

	function activeImage(el) {
		const url = "/Images/categories/active/";
		if (el.classList.contains("one")) {
			el.querySelector("img").src = url + "cinema.svg";
		} else if (el.classList.contains("two")) {
			el.querySelector("img").src = url + "music-note.svg";
		} else if (el.classList.contains("three")) {
			el.querySelector("img").src = url + "soccer-ball.svg";
		} else if (el.classList.contains("four")) {
			el.querySelector("img").src = url + "book.svg";
		} else if (el.classList.contains("five")) {
			el.querySelector("img").src = url + "video-game.svg";
		} else if (el.classList.contains("six")) {
			el.querySelector("img").src = url + "cake.svg";
		} else if (el.classList.contains("seven")) {
			el.querySelector("img").src = url + "luggage.svg";
		} else if (el.classList.contains("eight")) {
			el.querySelector("img").src = url + "lamp.svg";
		}
	}

	function nonActiveImage(el) {
		const url = "/Images/categories/";
		if (el.classList.contains("one")) {
			el.querySelector("img").src = url + "cinema.svg";
		} else if (el.classList.contains("two")) {
			el.querySelector("img").src = url + "music-note.svg";
		} else if (el.classList.contains("three")) {
			el.querySelector("img").src = url + "soccer-ball.svg";
		} else if (el.classList.contains("four")) {
			el.querySelector("img").src = url + "book.svg";
		} else if (el.classList.contains("five")) {
			el.querySelector("img").src = url + "video-game.svg";
		} else if (el.classList.contains("six")) {
			el.querySelector("img").src = url + "cake.svg";
		} else if (el.classList.contains("seven")) {
			el.querySelector("img").src = url + "luggage.svg";
		} else if (el.classList.contains("eight")) {
			el.querySelector("img").src = url + "lamp.svg";
		}
	}

	function deactivateAllCats(e) {
		let categories = e.target
			.closest(".categories-page")
			.querySelectorAll(".box");
		categories.forEach(function (category) {
			category.classList.remove("active");

			const url = "/Images/categories/";
			if (category.classList.contains("one")) {
				category.querySelector("img").src = url + "cinema.svg";
			} else if (category.classList.contains("two")) {
				category.querySelector("img").src = url + "music-note.svg";
			} else if (category.classList.contains("three")) {
				category.querySelector("img").src = url + "soccer-ball.svg";
			} else if (category.classList.contains("four")) {
				category.querySelector("img").src = url + "book.svg";
			} else if (category.classList.contains("five")) {
				category.querySelector("img").src = url + "video-game.svg";
			} else if (category.classList.contains("six")) {
				category.querySelector("img").src = url + "cake.svg";
			} else if (category.classList.contains("seven")) {
				category.querySelector("img").src = url + "luggage.svg";
			} else if (category.classList.contains("eight")) {
				category.querySelector("img").src = url + "lamp.svg";
			}
		});
	}

	document.addEventListener("click", function (e) {
		// Popup
		/* 	if(e.target.classList.contains('close-popup')) {
				if(e.target.parentElement.classList.contains('button-g')) {
					e.target.parentElement.parentElement.parentElement.style.display = 'none';
				} else {
					e.target.parentElement.parentElement.style.display = 'none';
				}
			}  */

		// Customization
		if (e.target.classList.contains("bgc")) {
			e.preventDefault();
			// alert(getStyle(e.target, "backgroundColor"));
			let colCards = e.target
				.closest(".customization-page")
				.querySelectorAll(".col-cards");
			let cardCustoms = e.target
				.closest(".customization-page")
				.querySelectorAll(".card-bgc div");
			let identifiers = e.target
				.closest(".customization-page")
				.querySelectorAll(".txt-identifier");
			let identifiers2 = e.target
				.closest(".customization-page")
				.querySelectorAll(".txt-identifier2 p");
			colCards.forEach(function (colCard) {
				colCard.style.backgroundColor = getStyle(e.target, "backgroundColor");
			});

			switch (getStyle(e.target, "backgroundColor")) {
				case "rgb(41, 140, 130)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#79A9A6";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(16, 16, 16)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#354040";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(54, 69, 79)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#243030";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(37, 30, 62)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#17132B";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(255, 255, 255)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#DEDEDE";
					});
					identifiers.forEach(function (i) {
						i.style.color = "black";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "black";
					});
					break;
				case "rgb(5, 20, 74)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#122770";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(24, 63, 13)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#304B29";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
				case "rgb(115, 35, 78)":
					cardCustoms.forEach(function (cardCustom) {
						cardCustom.style.backgroundColor = "#9E6989";
					});
					identifiers.forEach(function (i) {
						i.style.color = "white";
					});
					identifiers2.forEach(function (i2) {
						i2.style.color = "white";
					});
					break;
			}
		}

		if (e.target.classList.contains("text-color")) {
			e.preventDefault();

			let cardText = e.target
				.closest(".customization-page")
				.querySelectorAll(".card-text");
			let cardTitle = e.target
				.closest(".customization-page")
				.querySelectorAll(".card-title");
			let cardBgc = e.target
				.closest(".customization-page")
				.querySelectorAll(".card-bgc div");
			let identifiers2 = e.target
				.closest(".customization-page")
				.querySelectorAll(".txt-identifier2 p");

			cardText.forEach(function (cardTxt) {
				cardTxt.style.color = getStyle(e.target, "backgroundColor");
			});

			cardBgc.forEach(function (cardBc) {
				cardBc.style.color = getStyle(e.target, "backgroundColor");
			});

			identifiers2.forEach(function (identifier2) {
				identifier2.style.color = getStyle(e.target, "backgroundColor");
			});

			cardTitle.forEach(function (cardTtle) {
				cardTtle.style.color = getStyle(e.target, "backgroundColor");
			});
		}

		if (e.target.classList.contains("text-color")) {
			let columns = e.target
				.closest(".customization-page")
				.querySelectorAll(".text-color");
			columns.forEach(function (c) {
				c.classList.remove("active");
			});
			e.target.classList.add("active");
		}

		if (e.target.classList.contains("bgc")) {
			let columns2 = e.target
				.closest(".customization-page")
				.querySelectorAll(".bgc");
			columns2.forEach(function (c2) {
				c2.classList.remove("active");
			});
			e.target.classList.add("active");
		}

		// Categories
		if (e.target.classList.contains("box")) {
			if (e.target.classList.contains("active")) {
				e.target.classList.remove("active");
				nonActiveImage(e.target);
			} else {
				deactivateAllCats(e);
				e.target.classList.add("active");
				activeImage(e.target);
			}
		}

		// Recommendation (Mobile view)
		if (e.target.classList.contains("btn-open-recom")) {
			let recomSm = e.target
				.closest(".rankCreation-page")
				.querySelector(".recom-sm");
			if (recomSm !== null || recomSm !== undefined) {
				if (recomSm.classList.contains("non")) {
					e.target.innerHTML = "&times";
					recomSm.classList.remove("non");
					recomSm.classList.add("active");
				} else if (recomSm.classList.contains("active")) {
					e.target.innerHTML = "+";
					recomSm.classList.remove("active");
					recomSm.classList.add("non");
				}
			}
		}

		if (
			e.target.classList.contains("col-fav-sm") ||
			e.target.classList.contains("fav-sm")
		) {
			setTimeout(function () {
				window.scrollTo(0, 0);
			}, 100);
			document.querySelector(".section-absol").style.display = "block";
		}

		if (e.target.classList.contains("header-icon")) {
			document.querySelector(".section-absol").style.display = "none";
		}

		// Info button for RankCreation Page
		if (e.target.classList.contains("btn-close-info")) {
			let infoModal = e.target.closest("body").querySelector(".info-popup");

			infoModal.style.display = "none";
		}

		if (e.target.classList.contains("show-info")) {
			let infoModal = e.target.closest("body").querySelector(".info-popup");

			infoModal.style.display = "flex";
		}

		// Password
		if (e.target.classList.contains("see-password")) {
			if (e.target.classList.contains("one")) {
				if (document.querySelector(".input-pwd-one").type === "text") {
					e.target.src = "/Images/password/icon_open.svg";
					document.querySelector(".input-pwd-one").type = "password";
				} else if (
					document.querySelector(".input-pwd-one").type === "password"
				) {
					e.target.src = "/Images/password/icon_close.svg";
					document.querySelector(".input-pwd-one").type = "text";
				}
			}

			if (e.target.classList.contains("two")) {
				if (document.querySelector(".input-pwd-two").type === "text") {
					e.target.src = "/Images/password/icon_open.svg";
					document.querySelector(".input-pwd-two").type = "password";
				} else if (
					document.querySelector(".input-pwd-two").type === "password"
				) {
					e.target.src = "/Images/password/icon_close.svg";
					document.querySelector(".input-pwd-two").type = "text";
				}
			}
		}
	});

	setTimeout(function () {
		window.scrollTo(0, 0);
	}, 200);
}
