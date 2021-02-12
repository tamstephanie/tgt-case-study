import React from "react";
import _ from "lodash";

import NexTripApi from "app/Utilities/NexTripApi";
import RestfulComponent from "app/Utilities/Restful/RestfulComponent";

const DepartureContext = React.createContext({
    directions: [],
    directionId: "",
    routes: [],
    routeId: "",
    stops: [],
    stopId: "",
    fetchRoutes: () => {},
});

/**
 * Context that handles fetching 
 */
class DepartureProvider extends RestfulComponent {
    constructor(props) {
        super(props);

        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.fetchRouteDirections = this.fetchRouteDirections.bind(this);
        this.fetchRouteStops = this.fetchRouteStops.bind(this);
        this.fetchStopDepartures = this.fetchStopDepartures.bind(this);
        this.fetchStopDeparturesById = this.fetchStopDeparturesById.bind(this);
        this.pollDeparturesById = this.createPolling(this.fetchStopDeparturesById);
        this.handleDirectionSelection = this.handleDirectionSelection.bind(this);
        this.handleRouteSelection = this.handleRouteSelection.bind(this);
        this.handleStopIdInput = this.handleStopIdInput.bind(this);
        this.handleStopSelection = this.handleStopSelection.bind(this);

        this.state = {
            /**
             * @type {Array} List of live departures to show
             */
            departures: [],
            /**
             * @type {Array} List of possible directions 
             */
            directions: [],
            /**
             * @type {Number} The direction selected. Is an empty string if no direction is selected
             */
            directionId: "",
            /**
             * @type {String} Error message to display instead of a table if the request is bad
             */
            errorMessage: null,
            /**
             * @type {Array} List of possible routes for the day
             */
            routes: [],
            /**
             * @type {String} The selected route. Is an empty string if no route is selected
             */
            routeId: "",
            /**
             * @type {Boolean} Indicates if the live departures display should be shown
             */
            showLiveDepartures: false,
            /**
             * @type {Array} List of available stops for that route
             */
            stops: [],
            /**
             * @type {Number} The selected stop ID. Is empty string is no stop ID is set or provided
             */
            stopId: "",
            /**
             * @type {Object} Information about the stop, including the stop ID, latitude, and longitude of the stop
             */
            stopInfo: {},
            /**
             * @type {String} The four-letter code of the stop
             */
            stopPlace: "",

            // Fetch functions
            fetchRoutes: this.fetchRoutes,
            fetchRouteDirections: this.fetchRouteDirections,
            fetchRouteStops: this.fetchRouteStops,
            fetchStopDepartures: this.fetchStopDepartures,
            fetchStopDeparturesById: this.fetchStopDeparturesById,
            pollDeparturesById: this.pollDeparturesById,
            // Handler functions
            handleDirectionSelection: this.handleDirectionSelection,
            handleRouteSelection: this.handleRouteSelection,
            handleStopIdInput: this.handleStopIdInput,
            handleStopSelection: this.handleStopSelection,
        };
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    /**
     * Fetches the current day's routes from the NexTrip API
     */
    fetchRoutes() {
        NexTripApi.get("routes").then(response => {
            if (response.ok) {
                this.setState({routes: _.get(response, "data", [])});
            }
        });
    }

    /**
     * Fetches the directions based on the selected route
     */
    fetchRouteDirections() {
        let {routeId} = this.state;
        if (!_.isEmpty(routeId)) {
            NexTripApi.get(`directions/${routeId}`).then(response => {
                if (response.ok) {
                    this.setState({directions: _.get(response, "data")});
                }
            });
        }
    }

    /**
     * Fetches the list of stops based on the route and direction
     */
    fetchRouteStops() {
        let {routeId, directionId} = this.state;
        if (!_.isEmpty(routeId) && !_.isEmpty(`${directionId}`)) {
            NexTripApi.get(`stops/${routeId}/${directionId}`).then(response => {
                if (response.ok) {
                    this.setState({stops: _.get(response, "data", [])});
                }
            });
        }
    }

    /**
     * Fetches the list of live departures based on the route, direction, and stop
     */
    fetchStopDepartures() {
        let {routeId, directionId, stopPlace} = this.state;
        let validParams = !_.isEmpty(routeId) && !_.isEmpty(`${directionId}`) && !_.isEmpty(stopPlace);
        if (validParams) {
            NexTripApi.get(`${routeId}/${directionId}/${stopPlace}`).then(response => {
                if (response.ok) {
                    let stopInfo = _.get(response, "data.stops[0]");
                    this.setState({
                        departures: _.get(response, "data.departures", []),
                        showLiveDepartures: true,
                        stopId: _.get(stopInfo, "stop_id"),
                        stopInfo
                    }, this.pollDeparturesById);
                }
            });
        }
    }

    /**
     * Fetches the list of live departures based on the stop ID
     */
    fetchStopDeparturesById() {
        if (!_.isEmpty(`${this.state.stopId}`)) {
            NexTripApi.get(`${this.state.stopId}`).then(response => {
                if (response.ok) {
                    this.setState({
                        departures: _.get(response, "data.departures", []),
                        showLiveDepartures: true,
                        stopInfo: _.get(response, "data.stops[0]", {})
                    }, this.pollDeparturesById);
                } else {
                    this.setState({
                        errorMessage: _.get(response, "data.detail"),
                        showLiveDepartures: true
                    });
                }
            });
        }
    }

    /**
     * Function that handles selecting the route direction from the dropdown
     * @param {Event} event 
     */
    handleDirectionSelection = (event) => {
        // Reset stop place code and stop ID if a new direction is selected
        this.setState({
            directionId: event.target.value,
            showLiveDepartures: false,
            stopPlace: "",
            stopId: ""
        }, this.fetchRouteStops);
    }

    /**
     * Function that handles selecting the route from the dropdown
     * @param {Event} event - Event containing the route ID
     */
    handleRouteSelection = (event) => {
        // Reset the direction ID, stop place code, and stop ID if a new route is selected
        this.setState({
            routeId: event.target.value,
            directionId: "",
            showLiveDepartures: false,
            stopPlace: "",
            stopId: ""
        }, this.fetchRouteDirections);
    };

    /**
     * Function that handles when the user enters input
     * @param {Event} event - Event containing the stop number
     */
    handleStopIdInput = (event) => {
        // Reset the error message if input is updated
        this.setState({
            errorMessage: null,
            showLiveDepartures: false,
            stopId: !_.isEmpty(event.target.value) ? parseInt(event.target.value, 10) : ""
        });
    };

    /**
     * Function that handles selecting the stop place from the dropdown 
     * @param {Event} event 
     */
    handleStopSelection = (event) => {
        this.setState({
            stopPlace: event.target.value
        }, this.fetchStopDepartures);
    };

    render() {
        return (<DepartureContext.Provider value={this.state}>{this.props.children}</DepartureContext.Provider>);
    }
}

export default DepartureContext;
export {DepartureProvider};