import { createElement } from "react";
import PropTypes from "prop-types";

function LoadingSkeleton({ type, modifier, content, samples }) {

    if (!samples)
        samples = 1;

    const elements = Array(samples).fill(0).map((_, i) =>
        createElement(type, {
            className: `loading-skeleton --${type} ${modifier}`,
            key: i
        }, content));


    return <>
        {elements}
    </>;
}
export default LoadingSkeleton;

LoadingSkeleton.propTypes = {
    type: PropTypes.string,
    modifier: PropTypes.string,
    content: PropTypes.any,
    samples: PropTypes.number
}