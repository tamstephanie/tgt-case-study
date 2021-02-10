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
 * Re
 */
class DepartureProvider extends RestfulComponent {
    constructor(props) {
        super(props);

        this.fetchRoutes = this.fetchRoutes.bind(this);
        this.fetchRouteDirections = this.fetchRouteDirections.bind(this);
        this.fetchRouteStops = this.fetchRouteStops.bind(this);
        this.fetchStopDepartures = this.fetchStopDepartures.bind(this);
        this.fetchStopDeparturesById = this.fetchStopDeparturesById.bind(this);
        this.pollDepartures = this.createPolling(this.fetchDeparturesByStopId);
        this.handleDirectionSelection = this.handleDirectionSelection.bind(this);
        this.handleRouteSelection = this.handleRouteSelection.bind(this);
        this.handleStopSelection = this.handleStopSelection.bind(this);

        this.state = {
            departures: [],
            directions: [],
            directionId: "",
            routes: [],
            routeId: "",
            stops: [],
            stopId: "",
            stopInfo: {},
            stopPlace: "",

            // Fetch functions
            fetchRoutes: this.fetchRoutes,
            fetchRouteDirections: this.fetchRouteDirections,
            fetchRouteStops: this.fetchRouteStops,
            fetchStopDepartures: this.fetchStopDepartures,
            fetchStopDeparturesById: this.fetchStopDeparturesById,
            // Handler functions
            handleDirectionSelection: this.handleDirectionSelection,
            handleRouteSelection: this.handleRouteSelection,
            handleStopSelection: this.handleStopSelection,
        };
    }

    componentDidMount() {
        this.fetchRoutes();
    }

    /**
     * Fetches the current day's routes from the NexTrip API
     *
     * @note Assumes that the data received, if any, is already sorted
     */
    fetchRoutes() {
        NexTripApi.get("routes").then(response => {
            if (response.ok) {
                this.setState({routes: _.get(response, "data", [])});
            }
        });
    }

    /**
     * Fetches the directions (Eastbound/Westbound or Northbound/Southbound) for the selected route
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
     * 
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
     * 
     */
    fetchStopDepartures() {
        let {routeId, directionId, stopPlace} = this.state;
        let validParams = !_.isEmpty(routeId) && !_.isEmpty(`${directionId}`) && !_.isEmpty(stopPlace);
        if (validParams) {
            NexTripApi.get(`${routeId}/${directionId}/${stopPlace}`).then(response => {
                if (response.ok) {
                    this.setState({
                        departures: _.get(response, "data.departures", []),
                        stopId: _.get(response, "data.stops[0].stop_id"),
                        stopInfo: _.get(response, "data.stops[0]"),
                    }, this.pollDepartures);
                }
            });
        }
    }

    /**
     * 
     */
    fetchStopDeparturesById() {
        let {stopId} = this.state;
        NexTripApi.get(`${stopId}`).then(response => {
            if (response.ok) {
                this.setState({
                    departures: _.get(response, "data.departures", []),
                    stopInfo: _.get(response, "data.stops[0]", {})
                });    
            }
        });
    }

    /**
     * 
     * @param {Event} event 
     */
    handleDirectionSelection = (event) => {
        this.setState({
            directionId: event.target.value
        }, this.fetchRouteStops);
    }

    /**
     * 
     * @param {Event} event - Event containing the route ID
     */
    handleRouteSelection = (event) => {
        this.setState({
            routeId: event.target.value
        }, this.fetchRouteDirections);
    };

    /**
     * 
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