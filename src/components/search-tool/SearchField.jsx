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
        <div>
            <img src={icon} />
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            {value.length > 0 && <img
                src={xIcon}
                alt=""
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