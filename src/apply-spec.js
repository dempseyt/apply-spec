function isObject(value) {

}

function applySpec(specification) {
    return function (...args) {
        const appliedSpec = {}
        for (const [key, val] of Object.entries(specification)) {
            if (typeof val === 'function') {
                appliedSpec[key] = val(...args);
            } else if (Array.isArray(val)) {
                appliedSpec[key] = val.map((spec) => applySpec(spec)(...args));
            } else {
                appliedSpec[key] = applySpec(val)(...args);
            }
        }
        return appliedSpec;
    }
}

export default applySpec