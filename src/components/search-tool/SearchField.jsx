import { useState } from "react";
import { PropTypes } from "prop-types";
import xIcon from "../../assets/images/x.svg";

// SearchField component for input fields in the search tool
function SearchField({
    icon,         // The icon to display in the search field
    name,         // The identifier for the search field
    placeholder,  // The placeholder text in the search field
    setQuery      // Function to update the search query state
}) {
    // State for controlled input component
    const [value, setValue] = useState("");

    function handleChange(e) {
        const { value } = e.target;
        setValue(value);
        setQuery(value); // Update the search query using the provided setQuery function
    }

    return (
        <div className="search-tool__field">
            {/* Display the search icon */}
            <img src={icon} alt="search icon" className="search-tool__field__icon" />
            {/* Input field for searching */}
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange} // Handle changes in the input field
                className="search-tool__field__input"
            />
            {/* Display a clear search icon if there is input */}
            {value.length > 0 && (
                <img
                    src={xIcon}
                    alt="clear search icon"
                    className="search-tool__field__x-icon"
                    onClick={() => {
                        setValue("");  // Clear the input field
                        setQuery("");  // Clear the search query using the provided setQuery function
                    }}
                />
            )}
        </div>
    )
}

// PropTypes for type-checking and documenting component props
SearchField.propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    setQuery: PropTypes.func
};

export default SearchField;
