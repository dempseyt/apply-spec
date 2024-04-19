function applySpec(specification) {
    return function (...args) {
        const appliedSpec = {}
        for (const [key, val] of Object.entries(specification)) {
            if (typeof val === 'function') {
                appliedSpec[key] = val(...args);
            } else {
                appliedSpec[key] = applySpec(val)(...args);
            }
        }
        return appliedSpec;
    }
}

export default applySpec