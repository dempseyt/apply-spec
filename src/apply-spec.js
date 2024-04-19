function getHighestArity(spec) {
    let highestArity = Object.values(spec).reduce((acc, currentValue) => {
        if (typeof currentValue === 'function') {
            return Math.max(acc, currentValue.length);
        } else {
            getHighestArity(currentValue);
        }
    }, 0)

    return highestArity;

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

    return factory;
}

export default applySpec