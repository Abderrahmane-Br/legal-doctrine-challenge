// Import necessary modules and components
import useFetchData from "./hooks/useFetchData";
import SearchTool from "./components/search-tool/SearchTool";
import Table from "./components/table/Table";
import SearchField from "./components/search-tool/SearchField";
import { useState, useEffect } from "react";
import Pagination from "./components/pagination/Pagination";
import LoadingSkeleton from "./components/utils/LoadingSkeleton";

// Import images and styles
import searchIcon from "./assets/images/search.svg";
import powerIcon from "./assets/images/lightning-bolt.svg";
import "./styles/main.scss";

// Main App component
function App() {

	// Fetch Pokemon data and manage loading and error states
	const [pokemonData, isLoading, error] = useFetchData("./src/assets/data/pokemon.json", derivePower);

	// States for storing search results, visible rows, and search queries
	const [searchResults, setSearchResults] = useState([]);
	const [visibleRows, setVisibleRows] = useState([]);
	const [nameQuery, setNameQuery] = useState("");
	const [powerQuery, setPowerQuery] = useState("");

	// Calculate minimum and maximum power values from visible rows
	const minPower = visibleRows.reduce((a, b) => a < b.power ? a : b.power, Infinity);
	const maxPower = visibleRows.reduce((a, b) => a > b.power ? a : b.power, -1);

	// Use useEffect to perform search when data or search queries change
	useEffect(() => {
		const results = search(pokemonData, nameQuery, powerQuery);
		setSearchResults(results);
	}, [pokemonData, nameQuery, powerQuery]);

	return (
		<>
			{/* Render the SearchTool component, which contains search fields and indicators. */}
			<SearchTool>
				{/* 
					Render the SearchField component for searching by Pokemon name.
					- icon: Icon to display in the search field
					- setQuery: Function to update the name query state
      			*/}
				<SearchField
					icon={searchIcon}
					name="name"
					placeholder="Search..."
					setQuery={setNameQuery}
				/>
				{/* 
					Render the SearchField component for searching by power threshold.
					- icon: Icon to display in the search field
					- setQuery: Function to update the power query state
				*/}
				<SearchField
					icon={powerIcon}
					name="power"
					placeholder="Power threshold"
					setQuery={setPowerQuery}
				/>
				{/* 
					Render a loading indicator or minimum power information.
					- minPower: Minimum power value or "N/A" if no match was found.
				*/}
				{isLoading
					? <LoadingSkeleton type="div" modifier="--indicator" />
					: <div className="search-tool__indicator">Min power: {minPower !== Infinity ? minPower : "N/A"}</div>
				}
				{/* 
					Render a loading indicator or maximum power information.
					- maxPower: Maximum power value or "N/A" if no match was found.
				*/}
				{isLoading
					? <LoadingSkeleton type="div" modifier="--indicator" />
					: <div className="search-tool__indicator">Max power: {maxPower !== -1 ? maxPower : "N/A"}</div>
				}
			</SearchTool>
			{/* 
				Render the Table component to display visible rows of Pokemon data.
				- data: visible rows in the current page.
			*/}
			<Table data={visibleRows} isLoading={isLoading}></Table>

			{/* render a message if there are no matching Pokemons. */}
			{(!isLoading && visibleRows.length === 0 && !error) && <div className="info-msg">No matching Pokemons were found!</div>}

			{/* Render an error message if there is an error. */}
			{error && <div className="error-msg">{error.toString()}</div>}

			{/* Render a loading indicator or the Pagination component. */}
			{isLoading
				? <LoadingSkeleton type="div" modifier="--pagination" />
				: <Pagination data={searchResults} setVisibleRows={setVisibleRows} />
			}
		</>
	);

}

export default App;

// Helper function for searching data based on name and power query
function search(currentList, nameQuery, powerQuery) {
	nameQuery = nameQuery.toLowerCase();

	if (!nameQuery && !powerQuery)
		return currentList;
	else if (!nameQuery)
		return currentList.filter(item => item.power >= powerQuery);
	else if (!powerQuery)
		return currentList.filter(item => item.name.toLowerCase() === nameQuery);
	else
		return currentList.filter(item => item.name.toLowerCase() === nameQuery && item.power >= powerQuery);
}

// Helper function to derive a "power" property based on individual stats
function derivePower(data) {
	return data.map(item => ({
		...item,
		power: item.hp + item.attack + item.defense + item.speed + item.special_attack + item.special_defense
	}))
}
