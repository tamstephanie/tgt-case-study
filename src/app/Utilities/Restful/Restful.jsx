import _ from "lodash";
import ResponseData from "app/Utilities/ObjectClasses/ResponseData";

const bodyBuilder = (body, options) => {
    if (!_.isNil(body)) {
        let defaults;
        if (body.constructor === String) {
            defaults = {
                body,
                headers: {"Content-Type": "text/plain"}
            };
        } else {
            defaults = {
                body: JSON.stringify(body),
                headers: {"Content-Type": "application/json"}
            };
        }

        options = _.defaultsDeep(options, defaults);
    }

    return options;
};

const get = (url, options = {}, execution = "json", preventRedirects = false) => {
    options.method = "GET";
    return fetchAndResolve(url, options, execution, preventRedirects);
};

const post = (url, body = null, options = {}, execution = "json") => {
    options.method = "POST";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

const put = (url, body = null, options = {}, execution = "json") => {
    options.method = "PUT";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

/**
 * Performs a REST DELETE to the API
 * @notes
 *  - Generally only the first two arguments are needed
 *  - Method name is shorted since 'delete' is a keyword
 *
 * @param {String} url - API URL endpoint. Includes the domain and the query parameters
 * @param {Object} body 
 * @param {Object} options 
 * @param {String | Function} execution 
 */
const del = (url, body = null, options = {}, execution = "json") => {
    options.method = "DELETE";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

const fetchAndResolve = (url, options = {}, execution = "json", preventRedirects = false) => {
    const defaults = {};
    options = _.defaultsDeep(options, defaults);

    let response = fetch(url, options);
    return restfulResolve(response, execution, preventRedirects);
};

/**
 * Function that handles Promise resolution. It converts a Promise<Response> to Promise<ResponseData>.
 * See {@link ResponseData} for definition
 *
 * @param {Promise<Response>} responsePromise - Promise containing a Response
 * @param {String | Function} [execution="json"] - Body resolution method. Either the name of the
 *  function to call on the Response object, or a method that accepts a Response
 * @param {Boolean} preventRedirects - Indicates whether a redirect is allowed. Will throw an error if
 *  the response is a redirect, but redirects are not allowed
 *
 * @return {Promise<ResponseData>}
 * @throws {Error} if the response is a redirect and redirects aren't allowed
 */
const restfulResolve = (responsePromise, execution, preventRedirects = false) => {
    return responsePromise.then(response => {
        if (preventRedirects && response.redirected) {
            throw new Error("Redirect is not allowed");
        }

        if (execution.constructor === String) {
            return response[execution]()
                .catch(err => null)
                .then(data => new ResponseData(response.status, response.ok, data));
        } else {
            return execution(response)
                .catch(err => null)
                .then(data => new ResponseData(response.status, response.ok, data));
        }
    }, () => {
        return new ResponseData(NaN, false, null);
    });
}

const Restful = {del, get, post, put};
export default Restful;