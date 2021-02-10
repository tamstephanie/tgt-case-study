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

        let {departuresContextData} = props;
        this.pollDeparturesById = this.createPolling(departuresContextData.fetchDeparturesByStopId);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handlePaginationLabel = this.handlePaginationLabel.bind(this);

        this.state = {
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

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.departuresContextData.departures,
            this.props.departuresContextData.departures)) {
            this.setState(prevState => ({
                data: this.paginateData(prevState.page, prevState.rowsPerPage)
            }), this.pollDeparturesById);
        }
    }

    handlePageChange = (event, page) => {
        this.setState(prevState => ({
            data: this.paginateData(page, prevState.rowsPerPage),
            page
        }));
    };

    handlePageSizeChange = (event) => {
        let rowsPerPage = event.target.value;
        let page = 0;
        this.setState({
            data: this.paginateData(page, rowsPerPage),
            page,
            rowsPerPage
        });
    };

    handlePaginationLabel = ({from, to, count}) => (
        `${from}-${this.state.rowsPerPage === -1 ? count : to} of ${count}`
    );

    marshallDepartureData(departuresData) {
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

    paginateData(page, pageSize) {
        let data = this.marshallDepartureData(this.props.departuresContextData.departures);
        let startSlice = page * pageSize;
        let endSlice = (page + 1) * pageSize;
        let pagedData = data.slice(startSlice, endSlice);
        return pagedData;
    }

    /**
     * Renders information about the stop (name/description and the stop number)
     */
    renderStopInfo() {
        let {stopInfo} = this.props.departuresContextData;
        return (
            <Grid container className="stop-info-header">
                <Grid item xs={9}>
                    <Typography variant="h2">{_.get(stopInfo, "description")}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6"><b>Stop #:</b> {_.get(stopInfo, "stop_id")}</Typography>
                </Grid>
            </Grid>
        );
    }

    renderTable() {
        return (
            <MakeTable className="departures-table"
                data={this.state.data}
                headers={["ROUTE", "DESTINATION", "DEPARTS"]}
                paginated
                paginationProps={{
                    count: _.size(this.props.departuresContextData.departures),
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
        );
    }

    render() {
        console.log(this.props.departuresContextData.stopId)
        let {classes} = this.props;
        return (
            <Paper className={classes.liveDeparturesInfo + " live-departures-info"} elevation={0} square>
                {this.renderStopInfo()}
                {this.renderTable()}
            </Paper>
        );
    }
}

DepartureTable.propTypes = {
    /**
     * Departure information obtained from/by {@link DepartureContext}
     * @type {Object}
     */
    departuresContextData: PropTypes.object.isRequired,
};

export default withContext(DepartureContext, "departuresContextData")(conditionalExistence(
    (withStyles(DepartureTableStyle)(DepartureTable)),
    (props) => !_.isEmpty(`${props.departuresContextData.stopId}`)
));