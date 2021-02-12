import _ from "lodash";
import ResponseData from "app/Utilities/ObjectClasses/ResponseData";

/**
 * Creates the body of a PUT, POST, or DELETE request and sets the appropriate Content-Type
 *
 * @param {*} body - Information to pass to the endpoint
 * @param {Object} options - Previously defined options for the request
 * 
 * @return {Object} All of the options are now merged for proper passing to the request
 */
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

/**
 * Performs a RESTful GET request to the API
 *
 * @param {String} url - URL to the API endpoint, including the domain and any query parameters
 * @param {Object} options - HTTP(S) options, with the method overwritten to be a GET
 * @param {String | Function} execution - Function that defines how to handle the response. A string is acceptable
 *  if it's something like @enum {json, arrayBuffer, text, formData}
 * @param {Boolean} preventRedirects - Optional flag that prevents the fetch from handling redirect requests
 *
 * @return {Promise} The results from the API
 */
const get = (url, options = {}, execution = "json", preventRedirects = false) => {
    options.method = "GET";
    return fetchAndResolve(url, options, execution, preventRedirects);
};

/**
 * Performs a RESTful POST request to the API
 *
 * @param {String} url - URL to the API endpoint, including the domain and any query parameters
 * @param {Object} body - Payload for the request
 * @param {Object} options - HTTP(S) options, with the method overwritten to be a GET
 * @param {String | Function} execution - Function that defines how to handle the response. A string is acceptable
 *  if it's something like @enum {json, arrayBuffer, text, formData}
 *
 * @return {Promise} The results from the API
 */
const post = (url, body = null, options = {}, execution = "json") => {
    options.method = "POST";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

/**
 * Performs a RESTful PUT request to the API
 *
 * @param {String} url - URL to the API endpoint, including the domain and any query parameters
 * @param {Object} body - Payload for the request
 * @param {Object} options - HTTP(S) options, with the method overwritten to be a GET
 * @param {String | Function} execution - Function that defines how to handle the response. A string is acceptable
 *  if it's something like @enum {json, arrayBuffer, text, formData}
 *
 * @return {Promise} The results from the API
 */
const put = (url, body = null, options = {}, execution = "json") => {
    options.method = "PUT";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

/**
 * Performs a RESTful DELETE to the API
 * @note The function name has been shorted since 'delete' is a reserved keyword
 *
 * @param {String} url - URL to the API endpoint, including the domain and any query parameters
 * @param {Object} body - Payload for the request
 * @param {Object} options - HTTP(S) options, with the method overwritten to be a GET
 * @param {String | Function} execution - Function that defines how to handle the response. A string is acceptable
 *  if it's something like @enum {json, arrayBuffer, text, formData}
  *
 * @return {Promise} The results from the API
 */
const del = (url, body = null, options = {}, execution = "json") => {
    options.method = "DELETE";
    options = bodyBuilder(body, options);
    return fetchAndResolve(url, options, execution);
};

/**
 * Performs a fetch and converts the result into a {@link ResponseData} object
 *
 * @param {String} url - URL to the API endpoint, including the domain and any query parameters
 * @param {Object} options - HTTP(S) options, with the method overwritten to be a GET
 * @param {String | Function} execution - Function that defines how to handle the response. A string is acceptable
 *  if it's something like @enum {json, arrayBuffer, text, formData}
 * @param {Boolean} preventRedirects - Optional flag that prevents the fetch from handling redirect requests
 */
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
 * @return {Promise<ResponseData>} The promise formatted as a {@link ResponseData} object
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