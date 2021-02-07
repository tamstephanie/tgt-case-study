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

const DEPARTURE_SEARCH_TYPE = Object.freeze({
    ROUTE: "route",
    STOP_ID: "stopId"
});

const shapeDropdownOptions = (options, valueGetter, labelGetter) => (
    _.map(options, (option) => ({
        value: _.get(option, `${valueGetter}`),
        label: _.get(option, `${labelGetter}`)
    }))
);

/**
 * Form that lets the user 
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
     * 
     * @param {Event} event - ignored
     * @param {DEPARTURE_SEARCH_TYPE} newToggleVal - The new toggle value. One of DEPARTURE_SEARCH_TYPE
     */
    handleDepartureSearchToggle = (event, newToggleVal) => {
        this.setState({departureSearchType: newToggleVal});
    }

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
                    By route
                </ToggleButton>
                <ToggleButton value={DEPARTURE_SEARCH_TYPE.STOP_ID}>
                    By stop #
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }

    renderDropdownForm() {
        let {classes, departuresData} = this.props;
        let routes = shapeDropdownOptions(departuresData.routes, "route_id", "route_label");
        let directions = shapeDropdownOptions(departuresData.directions, "direction_id", "direction_name");
        let stops = shapeDropdownOptions(departuresData.stops, "place_code", "description");

        return (
            <div className={classes.departureDropdowns}>
                <Dropdown
                    emptyOption="Select route"
                    onChange={departuresData.handleRouteSelection}
                    options={routes}
                    selectedValue={departuresData.routeId}
                />
                {!_.isEmpty(departuresData.routeId) && (
                    <Dropdown
                        emptyOption="Select direction"
                        onChange={departuresData.handleDirectionSelection}
                        options={directions}
                        selectedValue={departuresData.directionId}
                    />
                )}
                {!_.isEmpty(departuresData.routeId) && !_.isEmpty(`${departuresData.directionId}`) && (
                    <Dropdown
                        emptyOption="Select stop"
                        onChange={departuresData.handleStopSelection}
                        options={stops}
                        selectedValue={departuresData.stopPlace}
                    />
                )}
            </div>
        );
    }

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
            <Paper className={classes.departureSearch} elevation={0} square>
                {this.renderDepartureToggle()}
                <Paper className={classes.departureSearchForm} elevation={0} square>
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
     * @type {Object}
     */
    departuresData: PropTypes.object.isRequired,
};

const style = (theme) => ({
    departureSearch: {
        fontSize: "1.15rem",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "40%",
        "& .MuiToggleButtonGroup-root": {
            marginBottom: "45px",
            marginLeft: "auto",
            marginRight: "auto",
        }
    },
    departureSearchForm: {
        marginLeft: "auto",
        marginRight: "auto",
        "& .DepartureForm-departureSearchForm-4": {
            marginBottom: "15px"
        },
        "& .MuiInput-root": {
            fontSize: "1.15rem"
        }
    }
});

export default withContext(DepartureContext, "departuresData")(withStyles(style)(DepartureForm));