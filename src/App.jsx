import useFetchData from "./hooks/useFetchData";
import SearchTool from "./components/search-tool/SearchTool";
import Table from "./components/table/Table";
import SearchField from "./components/search-tool/SearchField";
import { useState, useEffect } from "react";
import Pagination from "./components/pagination/Pagination";
import LoadingSkeleton from "./components/utils/LoadingSkeleton";

import searchIcon from "./assets/images/search.svg";
import powerIcon from "./assets/images/lightning-bolt.svg";

import "./styles/main.scss";

function App() {

	const [pokemonData, isLoading, error] = useFetchData("./src/assets/data/pokemon.json", derivePower);
	const [searchResults, setSearchResults] = useState([]);
	const [visibleRows, setVisibleRows] = useState([]);

	const [nameQuery, setNameQuery] = useState("");
	const [powerQuery, setPowerQuery] = useState("");

	const minPower = visibleRows.reduce((a, b) => a < b.power ? a : b.power, Infinity);
	const maxPower = visibleRows.reduce((a, b) => a > b.power ? a : b.power, -1);

	useEffect(() => {
		const results = search(pokemonData, nameQuery, powerQuery);
		setSearchResults(results);
	}, [pokemonData, nameQuery, powerQuery]);

	return <>
		<SearchTool>
			<SearchField
				icon={searchIcon}
				name="name"
				placeholder="Search..."
				setQuery={setNameQuery}
			/>
			<SearchField
				icon={powerIcon}
				name="power"
				placeholder="Power threshold"
				setQuery={setPowerQuery}
			/>
			{
				isLoading
					? <LoadingSkeleton type="div" modifier="--indicator" />
					: <div className="search-tool__indicator">Min power: {minPower !== Infinity ? minPower : "N/A"}</div>
			}
			{
				isLoading
					? <LoadingSkeleton type="div" modifier="--indicator" />
					: <div className="search-tool__indicator">Max power: {maxPower !== -1 ? maxPower : "N/A"}</div>
			}

		</SearchTool>
		<Table data={visibleRows} isLoading={isLoading}></Table>

		{(!isLoading && visibleRows.length === 0 && !error) && <div className="info-msg">No matching Pokemons were found!</div>}
		{error && <div className="error-msg">{error.toString()}</div>}

		{
			isLoading
				? <LoadingSkeleton type="div" modifier="--pagination" />
				: <Pagination data={searchResults} setVisibleRows={setVisibleRows} />
		}
	</>;
}

export default App;

function search(currentList, nameQuery, powerQuery) {
	nameQuery = nameQuery.toLowerCase();

	if (!nameQuery && !powerQuery)
		return currentList;
	else if (!nameQuery)
		return currentList.filter(item => item.power >= powerQuery);
	else if (!powerQuery)
		return currentList.filter(item => item.name.toLowerCase() == nameQuery);
	else
		return currentList.filter(item => item.name.toLowerCase() == nameQuery && item.power >= powerQuery);
}

function derivePower(data) {
	return data.map(item => ({
		...item,
		power: item.hp + item.attack + item.defense + item.speed + item.special_attack + item.special_defense
	}))
}