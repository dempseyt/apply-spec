import R from 'ramda'

function getHighestArity(spec) {
    const highestArity = Object.values(spec).reduce((highestArity, currentValue) => {
        let currentArity;
        if (typeof currentValue === 'function') {
            currentArity = currentValue.length;
        } else {
            currentArity = getHighestArity(currentValue);
        }
        return Math.max(currentArity, highestArity);
    }, 0)
    return highestArity
}

function applySpec(specification) {
    const highestArity = getHighestArity(specification);

    function factory(...args) {

        const results = Array.isArray(specification) ? [] : {};

        for (const [key, val] of Object.entries(specification)) {
            if (typeof val === 'function') {
                results[key] = val(...args);
            } else if (Array.isArray(val)) {
                results[key] = val.map((spec) => applySpec(spec)(...args));
            } else {
                results[key] = applySpec(val)(...args);
            }
        }
        return results;
    }

    Object.defineProperty(factory, "length", {
        value: highestArity,
        writable: false,
    });

    return R.curry(factory);
}

export default applySpec