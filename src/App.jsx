import useFetchData from "./hooks/useFetchData";
import SearchTool from "./components/search-tool/SearchTool";
import Table from "./components/table/Table";
import SearchField from "./components/search-tool/SearchField";
import { useState, useEffect } from "react";
import Pagination from "./components/pagination/Pagination";

function App() {

	const [pokemonData] = useFetchData("./src/assets/data/pokemon.json", derivePower);
	const [searchResults, setSearchResults] = useState([]);
	const [visibleRows, setVisibleRows] = useState([]);

	const [nameQuery, setNameQuery] = useState("");
	const [powerQuery, setPowerQuery] = useState("");

	useEffect(() => {
		const results = search(pokemonData, nameQuery, powerQuery);
		setSearchResults(results);
	}, [pokemonData, nameQuery, powerQuery]);

	return <>
		<SearchTool>
			<SearchField
				icon=""
				name="name"
				placeholder="Search"
				setQuery={setNameQuery}
			/>
			<SearchField
				icon=""
				name="power"
				placeholder="Power threshold"
				setQuery={setPowerQuery}
			/>
		</SearchTool>
		<Table data={visibleRows}></Table>
		<Pagination data={searchResults} setVisibleRows={setVisibleRows} />
	</>;
}

export default App;

function search(currentList, nameQuery, powerQuery) {
	if (!nameQuery && !powerQuery)
		return currentList;
	else if (!nameQuery)
		return currentList.filter(item => item.power >= powerQuery);
	else if (!powerQuery)
		return currentList.filter(item => item.name == nameQuery);
	else
		return currentList.filter(item => item.name == nameQuery && item.power >= powerQuery);
}

function derivePower(data) {
	return data.map(item => ({
		...item,
		power: item.hp + item.attack + item.defense + item.speed + item.special_attack + item.special_defense
	}))
}