import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Grid, Paper, Typography, withStyles} from "@material-ui/core";

import DepartureContext from "app/Context/DepartureContext";
import RestfulComponent from "app/Utilities/Restful/RestfulComponent";
import {withContext} from "app/WrappersHOCs/Wrappers/withContext";
import {conditionalExistence} from "app/WrappersHOCs/HOCs/ConditionalExistence";

import MakeTable from "app/General/DataDisplay/Tables/MakeTable/MakeTable";
import PaginationActions from "app/WrappersHOCs/Wrappers/MakePagination/PaginationActions";
import {DepartureTableStyle} from "./DepartureTable.style";

class DepartureTable extends RestfulComponent {
    constructor(props) {
        super(props);

        // Binded functions
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handlePaginationLabel = this.handlePaginationLabel.bind(this);

        this.state = {
            /**
             * @type {Array} List of data to display. Currently is paginated
             */
            data: this.paginateData(0, 5),
            /**
             * @type {Number} The current page to display. Starts numbering at 0
             */
            page: 0,
            /**
             * @type {Number} The current number of rows to display per page
             */
            rowsPerPage: 5
        };
    }

    /**
     * Lifecycle - Check if the data has updated and if so, update the state  
     */
    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.departuresData.departures,
            this.props.departuresData.departures)) {
            this.setState(prevState => ({
                data: this.paginateData(prevState.page, prevState.rowsPerPage)
            }));
        }
    }

    /**
     * Handles changing the page and updates the displayed data
     * @param {Event} event - Ignored
     * @param {Number} page - The current page number
     */
    handlePageChange = (event, page) => {
        this.setState(prevState => ({
            data: this.paginateData(page, prevState.rowsPerPage),
            page
        }));
    };

    /**
     * Handles updating the number of rows to display, along with updating the page number and data
     * @param {Event} event - Event containing the numbers of rows to display
     */
    handlePageSizeChange = (event) => {
        let rowsPerPage = parseInt(event.target.value, 10);
        let page = 0;
        this.setState({
            data: this.paginateData(page, rowsPerPage),
            page,
            rowsPerPage
        });
    };

    /**
     * Function that controls the pagination label
     * @param {{from: Number, to: Number, count: Number}} displayedData -  
     */
    handlePaginationLabel = ({from, to, count}) => (
        `${from}-${this.state.rowsPerPage === -1 ? count : to} of ${count}`
    );

    /**
     * Shapes the departure data into the proper shape for displaying in the table
     * @param {[Object]} departuresData - List of info about the live departures for a stop
     */
    marshallDepartureData(departuresData) {
        // If the data received is empty, return a formatted row to indicate no departures are available
        return _.isEmpty(departuresData) ? [{
            route: null,
            destination: <b>No departures at this time</b>,
            departs: null
        }] : (_.map(departuresData, (departureInfo) => ({
            route: <b>{_.get(departureInfo, "route_short_name")}{_.get(departureInfo, "terminal", "")}</b>,
            destination: _.get(departureInfo, "description"),
            departs: <b>{_.get(departureInfo, "departure_text")}</b>
        })));
    }

    /**
     * Takes the full list of departure data and slices it based on the current page and page size
     * so that the table displays the properly paginated information
     * @param {Number} page - The current page
     * @param {Number} pageSize - The rows of data to display
     */
    paginateData(page, pageSize) {
        let data = this.marshallDepartureData(this.props.departuresData.departures);
        let sliceSize = (pageSize === -1) ? _.size(this.props.departuresData.departures) : pageSize;
        let startSlice = page * sliceSize;
        let endSlice = (page + 1) * sliceSize;
        let pagedData = data.slice(startSlice, endSlice);
        return pagedData;
    }

    /**
     * Renders general information about the stop and a paginated table of live departures
     */
    renderDepartureData() {
        let {stopInfo} = this.props.departuresData;
        return (
            <React.Fragment>
                <Grid container className="stop-info-header">
                    <Grid item xs={9}>
                        <Typography variant="h2">{_.get(stopInfo, "description")}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6"><b>Stop #:</b> {_.get(stopInfo, "stop_id")}</Typography>
                    </Grid>
                </Grid>
                <MakeTable className="departures-table"
                    data={this.state.data}
                    headers={["ROUTE", "DESTINATION", "DEPARTS"]}
                    paginated
                    paginationProps={{
                        count: _.size(this.props.departuresData.departures),
                        labelDisplayedRows: this.handlePaginationLabel,
                        onChangePage: this.handlePageChange,
                        onChangeRowsPerPage: this.handlePageSizeChange,
                        page: this.state.page,
                        rowsPerPage: this.state.rowsPerPage,
                        rowsPerPageOptions: [5, 10, 25, {label: 'All', value: -1}],
                        ActionsComponent: PaginationActions,
                        SelectProps: {native: true}
                    }}
                />
            </React.Fragment>
        );
    }

    render() {
        let {classes, departuresData} = this.props;
        return (
            <Paper className={classes.liveDeparturesInfo + " live-departures-info"} elevation={0} square>
                {!_.isNil(departuresData.errorMessage) ? (
                    <Typography className="error-message" variant="h6">
                        {`${departuresData.stopId} is not a valid stop number. Please try again.`}
                    </Typography>
                ) : this.renderDepartureData()}
            </Paper>
        );
    }
}

DepartureTable.propTypes = {
    /**
     * Departure information obtained from/by {@link DepartureContext}
     * @type {Object}
     */
    departuresData: PropTypes.object.isRequired,
};

export default withContext(DepartureContext, "departuresData")(conditionalExistence(
    (withStyles(DepartureTableStyle)(DepartureTable)),
    (props) => props.departuresData.showLiveDepartures
));