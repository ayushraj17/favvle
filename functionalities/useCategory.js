import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CATEGORIES, categoriesUrl } from "../Constants";
import Axios from "axios";
import usePlacesAutocomplete from "use-places-autocomplete";

function useCategory() {
	const router = useRouter();
	const [category, setCategory] = useState("");
	const [results, setResults] = React.useState([]);

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			// fields: ["photo", "name", "icon"].join(","),
			/* Define search scope here */
		},
		debounce: 300,
	});

	useEffect(() => {
		setCategory(router.query.category);
	}, [router.query.category]);

	useEffect(() => {
		console.log(data, ready, status);
	});

	const getOptionsLabel = (options) => {
		// console.log(options, category);
		return options.map((option) => option.Title + " : " + option.Year);
		// switch (category?.toLowerCase()) {
		// 	case CATEGORIES.cinema:

		// 	default:
		// 		return options;
		// }
	};

	// const getUrlByCategory = (search) => {
	// 	switch (category?.toLowerCase()) {
	// 		case CATEGORIES.cinema:
	// 			return categoriesUrl.cinema({ search });

	// 		default:
	// 			return [];
	// 	}
	// };

	// ?q=atomic%20habit&_facet=false&_spellcheck_count=0&limit=10&fields=key,cover_i,title,author_name,name&mode=everything

	const getOptionsByCategory = async (search) => {
		switch (category?.toLowerCase()) {
			case CATEGORIES.cinema:
				Axios.get(categoriesUrl.cinema, {
					params: {
						s: search,
						apikey: "1bacbed6",
					},
				}).then((res) => {
					if (res.data?.Search) return setResults(res.data.Search);
				});
				break;

			case CATEGORIES.games:
				Axios.get(categoriesUrl.games, {
					params: {
						search,
						key: "920efb8a27bd41efb3f13101d7488f52",
					},
				}).then((res) => {
					if (res.data?.results) {
						const result = res.data.results.map(
							({ name, released, background_image, id }) => ({
								Title: name,
								Poster: background_image,
								Year: released ? new Date(released).getFullYear() : "--",
								imdbID: id,
							})
						);
						console.log(result);
						return setResults(result);
					}
				});
				break;

			case CATEGORIES.books:
				Axios.get(categoriesUrl.books, {
					params: {
						q: search,
						fields: "key,cover_i,title,author_name,name,lccn",
						mode: "everything",
						_facet: false,
						_spellcheck_count: 0,
						limit: 10,
					},
				}).then((res) => {
					if (res.data?.docs) {
						const result = res.data.docs
							.map(({ title, author_name, key, lccn }) => ({
								Title: title,
								Poster:
									lccn &&
									`http://covers.openlibrary.org/b/lccn/${lccn[0]}-M.jpg`,
								Year: author_name?.join(","),
								imdbID: key,
							}))
							.filter((item) => !!item.Poster);
						// console.log(result);
						return setResults(result);
					}
				});
				break;
			case CATEGORIES.travel:
				console.log(search);
				setValue(search);
				// console.log(data);
				// return setResults(data);
				break;

			default:
				return [];
		}
	};

	return {
		getOptionsLabel,
		// getUrlByCategory,
		getOptionsByCategory,
		results,
	};
}

export default useCategory;
