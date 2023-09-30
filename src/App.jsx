import useFetchData from "./hooks/useFetchData";
import SearchTool from "./components/search-tool/SearchTool";
import Table from "./components/table/Table";
import SearchField from "./components/search-tool/SearchField";
import { useState, useEffect } from "react";
import Pagination from "./components/pagination/Pagination";

function App() {

	const [pokemonData] = useFetchData("./src/assets/data/pokemon.json");
	const [searchResults, setSearchResults] = useState([]);

	const [nameQuery, setNameQuery] = useState("")
	const [powerQuery, setPowerQuery] = useState("")

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

function search(data, nameQuery, powerQuery) {

	if (!nameQuery && !powerQuery)
		return data;
	else if (!nameQuery)
		return data.filter(item => item.speed >= powerQuery);
	else if (!powerQuery)
		return data.filter(item => item.name == nameQuery);
	else
		return data.filter(item => item.name == nameQuery && item.speed >= powerQuery);

}
