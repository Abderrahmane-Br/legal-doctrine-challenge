import { createElement } from "react";

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
export default LoadingSkeleton