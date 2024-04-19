function applySpec(specification) {
    return function (value1, value2) {
        const appliedSpec = {}
        for (const [key, func] of Object.entries(specification)) {
            appliedSpec[key] = func(value1, value2);
        }
        return appliedSpec;
    }
}

export default applySpec