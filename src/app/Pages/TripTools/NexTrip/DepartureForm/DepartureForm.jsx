import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {FormControl, Input, InputAdornment, InputLabel, Paper, withStyles} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {ToggleButtonGroup, ToggleButton} from "@material-ui/lab";

import DepartureContext from "app/Context/DepartureContext";
import {withContext} from "app/WrappersHOCs/Wrappers/withContext";
import Dropdown from "app/General/Inputs/Dropdown/Dropdown";
import MountedComponent from "app/Utilities/MountedComponent";
import {DepartureFormStyle} from "./DepartureForm.style";

/**
 * Local enum that indicates the method of retrieving live departure information
 */
const DEPARTURE_SEARCH_TYPE = Object.freeze({
    ROUTE: "route",
    STOP_ID: "stopId"
});

/**
 * Shapes the array of data to match the expected format (see below) for [Dropdown]
 * <pre>
 * {
 *     value: String,
 *     label: String
 * }
 * </pre>
 *
 * @note This assumes that [options] is an array of objects. Otherwise, it doesn't make sense to pass the
 *  array through this function to shape the data
 *
 * @param {Object[]} options - The list data to shape
 * @param {String} valueGetter - Field ID for the value
 * @param {String} labelGetter - Field ID for retrieving the label
 */
const shapeDropdownOptions = (options, valueGetter, labelGetter = null) => (
    _.map(options, (option) => {
        let shapedData = {
            value: _.get(option, `${valueGetter}`)
        };
        if (!_.isNil(labelGetter)) {
            shapedData.label = _.get(option, `${labelGetter}`);
        }
        return shapedData;
    })
);

/**
 * Form that lets the user either select route information or enter a stop ID to get live departures
 */
class DepartureForm extends MountedComponent {
    constructor(props) {
        super(props);

        this.handleDepartureSearchToggle = this.handleDepartureSearchToggle.bind(this);

        this.state = {
            departureSearchType: DEPARTURE_SEARCH_TYPE.ROUTE
        };
    }

    /**
     * Function responsible for
     *
     * @param {Event} event - ignored
     * @param {DEPARTURE_SEARCH_TYPE} newToggleVal - The new toggle value. One of DEPARTURE_SEARCH_TYPE
     */
    handleDepartureSearchToggle = (event, newToggleVal) => {
        this.setState({departureSearchType: newToggleVal});
    }

    /**
     * Renders a group of toggle buttons that control how to retrieve live departure information
     *
     * @returns {JSX}
     */
    renderDepartureToggle() {
        return (
            <ToggleButtonGroup
                value={this.state.departureSearchType}
                onChange={this.handleDepartureSearchToggle}
                exclusive
                size="large"
                color="primary"
            >
                <ToggleButton value={DEPARTURE_SEARCH_TYPE.ROUTE}>
                    <b>By route</b>
                </ToggleButton>
                <ToggleButton value={DEPARTURE_SEARCH_TYPE.STOP_ID}>
                    <b>By stop #</b>
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }

    /**
     * Renders the dropdowns to get live departures by route
     *
     * @returns {JSX}
     */
    renderDropdownForm() {
        let {classes, departuresData} = this.props;
        let routes = shapeDropdownOptions(departuresData.routes, "route_id", "route_label");
        let directions = shapeDropdownOptions(departuresData.directions, "direction_id", "direction_name");
        let stops = shapeDropdownOptions(departuresData.stops, "place_code", "description");

        return (
            <div className={classes.departureDropdowns + " departure-dropowns"}>
                <Dropdown
                    emptyOption="Select route"
                    onChange={departuresData.handleRouteSelection}
                    options={routes}
                    selectedValue={departuresData.routeId}
                    color="secondary"
                />
                {!_.isEmpty(departuresData.routeId) && (
                    <Dropdown
                        emptyOption="Select direction"
                        onChange={departuresData.handleDirectionSelection}
                        options={directions}
                        selectedValue={departuresData.directionId}
                        color="secondary"
                    />
                )}
                {!_.isEmpty(departuresData.routeId) && !_.isEmpty(`${departuresData.directionId}`) && (
                    <Dropdown
                        emptyOption="Select stop"
                        onChange={departuresData.handleStopSelection}
                        options={stops}
                        selectedValue={departuresData.stopPlace}
                        color="secondary"
                    />
                )}
            </div>
        );
    }

    /**
     * Renders a number-only input. Used for getting live departures by stop ID
     *
     * @returns {JSX}
     */
    renderStopIdInput() {
        return (
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Enter stop #</InputLabel>
                <Input
                    id="stop-id-input"
                    type="number"
                    startAdornment={<InputAdornment position="start"><Search /></InputAdornment>}
                    color="primary"
                />
            </FormControl>
        );
    }

    render() {
        let {classes} = this.props;
        return (
            <Paper className={classes.departureSearch + " departure-search"} elevation={0} square>
                {this.renderDepartureToggle()}
                <Paper className={classes.departureSearchForm + " departure-search-form"} elevation={0} square>
                    {_.isEqual(this.state.departureSearchType, DEPARTURE_SEARCH_TYPE.ROUTE) ? 
                        this.renderDropdownForm() : this.renderStopIdInput()
                    }
                </Paper>
            </Paper>
        );
    }
}

DepartureForm.propTypes = {
    /**
     * Departure information obtained from/by {@link DepartureContext}
     * @type {Object}
     */
    departuresData: PropTypes.object.isRequired,
};

export default withContext(DepartureContext, "departuresData")(withStyles(DepartureFormStyle)(DepartureForm));