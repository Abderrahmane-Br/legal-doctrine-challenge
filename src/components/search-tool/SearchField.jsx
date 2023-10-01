import { useState } from "react";
import { PropTypes } from "prop-types";
import xIcon from "../../assets/images/x.svg";

function SearchField({
    icon,
    name,
    placeholder,
    setQuery
}) {
    const [value, setValue] = useState("");

    function handleChange(e) {
        const { value } = e.target;
        setValue(value);
        setQuery(value);
    }

    return (
        <div className="search-tool__field">
            <img src={icon} alt="search icon" className="search-tool__field__icon" />
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="search-tool__field__input"
            />
            {value.length > 0 && <img
                src={xIcon}
                alt="clear search icon"
                className="search-tool__field__x-icon"
                onClick={() => { setValue(""); setQuery("") }}
            />}
        </div>
    )
}
export default SearchField;

SearchField.propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    setQuery: PropTypes.func
}