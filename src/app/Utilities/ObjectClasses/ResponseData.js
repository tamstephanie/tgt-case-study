import _ from "lodash";

/**
 * Class responsible for shaping the Promise.Response
 *
 * Currently assumes that the response from the API returns these fields
 */
class ResponseData {
    /**
     * Constructs a ResponseData instance
     *
     * @param {Number} status - The HTTP response code
     * @param {Boolean} ok - Indicates if the response is good
     * @param {*} data - The resolved body, like a JSON object or String
     */
    constructor(status, ok, data) {
        if (!_.isNumber(status) || !_.isBoolean(ok)) {
            throw new TypeError("Illegal argument types provided to ResponseData constructor.")
        }

        this.status = status;
        this.ok = ok;
        this.data = _.isNil(data) ? null : data;
    }

    /**
     * Gets the data
     */
    get json() {
        return this.data;
    }

    /**
     * Function that evaluates if the data is in JSON format
     */
    hasData() {
        return !_.isNil(this.data) && _.isObject(this.data);
    }

    /**
     * Function that evaluates if the data is in a text format
     */
    hasText() {
        return !_.isNil(this.data) && _.isString(this.data);
    }
}

export default ResponseData;