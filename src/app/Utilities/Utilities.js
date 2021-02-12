import _ from "lodash";

/**
 * Function that checks if the provided input is valid. This acts like a general catch all; however, it
 * is important to note that it doesn't catch custom cases. For special cases, those checks should be
 * handled where they are needed.
 *
 * @param {*} value - The item to check
 * 
 * @return {Boolean} True if the value is valid against these criteria
 */
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