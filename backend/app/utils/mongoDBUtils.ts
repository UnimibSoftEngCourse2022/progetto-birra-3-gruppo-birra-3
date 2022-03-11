export function getParamsForLike(query: any): any {
    let _params = {};

    if (query) {
        for (let key of Object.keys(query)) {
            _params = {..._params, ...{[key]: {$regex: new RegExp(query[key].trim() ?? ""), $options: "i"}}};
        }
    }

    return _params;
}
