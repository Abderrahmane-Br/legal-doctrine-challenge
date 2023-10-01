import { createElement } from "react";
import PropTypes from "prop-types";

function LoadingSkeleton({ type, modifier, content, samples }) {
    // If "samples" is not provided, set it to 1 by default
    if (!samples) {
        samples = 1;
    }

    // Create an array of loading skeleton elements based on the provided type, modifier, and content
    const elements = Array(samples).fill(0).map((_, i) =>
        createElement(
            type, // The type of element to create (e.g., "div", "span")
            {
                className: `loading-skeleton --${type} ${modifier}`, // CSS classes for styling
                key: i, // Unique key for each element
            },
            content // Content to display within the element (can be any content or component)
        )
    );

    return (
        <>
            {elements}
        </>
    );
}

// PropTypes for type-checking and documenting component props
LoadingSkeleton.propTypes = {
    type: PropTypes.string,   // The type of element to create (e.g., "div", "span")
    modifier: PropTypes.string,  // CSS modifier class name for styling
    content: PropTypes.any,    // Content to display within the element
    samples: PropTypes.number  // The number of loading skeleton elements to render
};

export default LoadingSkeleton;
