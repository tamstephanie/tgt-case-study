import _ from "lodash";

/**
 * Class responsible for shaping the Promise.Response
 *
 * Currently assumes that the response from the API returns these fields
 */
class ResponseData {
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
     * Function that evaluates if the ResponseData contains JSON data
     */
    hasData = () => !_.isNil(this.data) && _.isObject(this.data);
}

export default ResponseData;