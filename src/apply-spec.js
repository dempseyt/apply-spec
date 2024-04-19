function isObject(value) {

}

function applySpec(specification) {
    return function (...args) {
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
}

export default applySpec