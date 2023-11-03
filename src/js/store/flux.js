const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			starships: [],
			planets: [],
			likes: [],
			detailCharacter: {},
			detailPlanet: {},
		},
		actions: {
			fetchInitialData: async () => {
				const SWAPI_TECH_URL = "https://www.swapi.tech/api";
				const peopleUrl = `${SWAPI_TECH_URL}/people`;
				const planetsUrl = `${SWAPI_TECH_URL}/planets`;
				const starshipsUrl = `${SWAPI_TECH_URL}/starships`;

				const localData = window.localStorage.getItem("starwars");
				const likes = window.localStorage.getItem("likes");

				if (!localData) {
					const fetchData = (url) =>
						fetch(url)
							.then((data) => data.json())
							.then((json) => json.results);

					const planetsPromise = fetchData(planetsUrl);
					const peoplePromise = fetchData(peopleUrl);
					const starshipsPromise = fetchData(starshipsUrl);

					const [planets, people, starships] = await Promise.all([
						planetsPromise,
						peoplePromise,
						starshipsPromise,
					]);

					setStore({
						planets,
						people,
						starships,
					});

					return window.localStorage.setItem(
						"starwars",
						JSON.stringify({
							planets,
							people,
							starships,
						})
					);
				}

				setStore({
					...JSON.parse(localData),
					likes: likes ? JSON.parse(likes) : [],
				});
			},
			fetchDetailData: async (type, id) => {
				const API_URL = "https://www.swapi.tech/api";
				const resourceUrl = `${API_URL}/${type}/${id}`;

				try {
					const response = await fetch(resourceUrl);

					if (!response.ok) {
						console.error('Server error:', response.statusText);
						return;
					}

					const json = await response.json();

					const resourceDetailUrl = json.result[type];

					const detailResponse = await fetch(resourceDetailUrl);

					if (!detailResponse.ok) {
						console.error('Error fetching resource details:', detailResponse.statusText);
						return;
					}

					const detailJson = await detailResponse.json();

					setStore({
						detailCharacter: {
							...detailJson.result.properties,
							description: detailJson.result.description,
							uid: detailJson.result.uid,
						},
					});
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			fetchPlanetData: async (id) => {
				const API_URL = "https://www.swapi.tech/api";
				const planetUrl = `${API_URL}/planets/${id}`;

				try {
					const response = await fetch(planetUrl);

					if (!response.ok) {
						console.error('Server error:', response.statusText);
						return;
					}

					const json = await response.json();

					const resourceDetailUrl = json.result.planets; 

					const detailResponse = await fetch(resourceDetailUrl);

					if (!detailResponse.ok) {
						console.error('Error fetching resource details:', detailResponse.statusText);
						return;
					}

					const detailJson = await detailResponse.json();

					setStore({
						detailPlanet: {
							...detailJson.result.properties,
							description: detailJson.result.description,
							uid: detailJson.result.uid,
						},
					});
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			fetchPersonData: async (id) => {
				const API_URL = "https://www.swapi.tech/api";
				const personUrl = `${API_URL}/people/${id}`;

				try {
					const response = await fetch(personUrl);

					if (!response.ok) {
						console.error('Server error:', response.statusText);
						return;
					}

					const json = await response.json();

					const resourceDetailUrl = json.result.people; 

					const detailResponse = await fetch(resourceDetailUrl);

					if (!detailResponse.ok) {
						console.error('Error fetching resource details:', detailResponse.statusText);
						return;
					}

					const detailJson = await detailResponse.json();

					setStore({
						detailPerson: {
							...detailJson.result.properties,
							description: detailJson.result.description,
							uid: detailJson.result.uid,
						},
					});
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			fetchStarshipData: async (id) => {
				const API_URL = "https://www.swapi.tech/api";
				const starshipUrl = `${API_URL}/starships/${id}`;

				try {
					const response = await fetch(starshipUrl);

					if (!response.ok) {
						console.error('Server error:', response.statusText);
						return;
					}

					const json = await response.json();

					const resourceDetailUrl = json.result.starships;

					const detailResponse = await fetch(resourceDetailUrl);

					if (!detailResponse.ok) {
						console.error('Error fetching resource details:', detailResponse.statusText);
						return;
					}

					const detailJson = await detailResponse.json();

					setStore({
						detailStarship: {
							...detailJson.result.properties,
							description: detailJson.result.description,
							uid: detailJson.result.uid,
						},
					});
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			fetchGeneralData: async (type) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/${type}`);
					const data = await response.json();

					setStore({
						[type]: data.results,
					});

				} catch (error) {
					console.error("Error fetching general data:", error);
				}
			},

		cleanDetailView: () => {
			setStore({ detailCharacter: {} });
		},
		addNewLikedElement: (elementToAdd) => {
			const likes = getStore().likes;
			const updatedLikes = [...likes, elementToAdd];
			window.localStorage.setItem("likes", JSON.stringify(updatedLikes));
			setStore({ likes: updatedLikes });
		},
		removeLikedElement: (id) => {
			const likes = getStore().likes;
			const filtered = likes.filter((element) => element.id !== id);
			window.localStorage.setItem("likes", JSON.stringify(filtered));
			setStore({ likes: filtered });
		},
		isLikedElement: (id) => {
			const likes = getStore().likes;
			const likesId = likes.map((element) => element.id);
			return likesId.includes(id);
		},
	},
	};
};

export default getState;