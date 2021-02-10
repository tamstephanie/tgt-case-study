import _ from "lodash";

export const hasValue = function (value) {
    if (_.isNil(value)) {
        return false;
    }
    if (_.isNumber(value)) {
        return isFinite(value) && !_.isNan(value);
    } else if (_.isObject(value)) {
        return !_.isEmpty(value);
    } else if (_.isString(value)) {
        let lowercaseVal = _.toLower(value);
        if (lowecaseVal === "null" ||
            lowercaseVal === "undefined" ||
            lowercaseVal === "nan" ||
            lowercaseVal === "infinity" ||
            lowercaseVal === "false" ||
            !value) {
            return false;
        }
    } else if (!value) {
        return false;
    }
    return true;
};