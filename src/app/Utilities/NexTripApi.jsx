/**
 * This file is responsible for calling the NexTrip REST API 
 */
import _ from "lodash";

import Restful from "./Restful/Restful";

/**
 * Constant containing the main URL for the NexTrip REST API
 */
const BASE_URL = "https://svc.metrotransit.org/nextripv2";


const get = (url, options = {}) => {
    return Restful.get(`${BASE_URL}/${url}`, options);
};

const NexTripApi = {get};
export default NexTripApi;