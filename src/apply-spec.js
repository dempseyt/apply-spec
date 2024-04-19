function applySpec(specification) {
    return function (value) {
        if (Object.entries(specification).length === 0) {
            return {};
        }
        let appliedSpec = {}
        for (let [key, func] of Object.entries(specification)) {
            appliedSpec[key] = func(value);
        }
        return appliedSpec;
    }

}

export default applySpec