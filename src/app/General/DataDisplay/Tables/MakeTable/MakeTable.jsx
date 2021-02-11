import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
    Table, TableBody, TableCell, TableContainer, TableFooter, TableHead,
    TablePagination, TableRow, Typography
} from "@material-ui/core";

/**
 * Creates a Material UI table based on the provided data
 */
class MakeTable extends Component {
    constructor(props) {
        super(props);
    }

    renderBody() {
        return (
            <TableBody>
                {_.map(this.props.data, (dataItem, index) => (
                    <TableRow key={`body-row-${index}`} className="table-body-row">
                        {_.map(dataItem, (value, key) => (
                            <TableCell key={`body-cell-${key}`} className="table-body-cell">
                                <Typography>{value}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        );
    }

    renderFooter() {
        return (
            <TableFooter>
                {this.renderPagination()}
            </TableFooter>
        );
    }

    renderPagination() {
        return (this.props.paginated ? (
            <TableRow>
                <TablePagination {...this.props.paginationProps} />
            </TableRow>
        ) : null)
    }

    renderHeaders() {
        return (
            <TableHead>
                <TableRow className="table-head-row">
                    {_.map(this.props.headers, (header) => (
                        <TableCell key={header} className="table-head-cell">
                            <Typography variant="h6"><b>{header}</b></Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    render() {
        return (
            <TableContainer className="make-table">
                <Table>
                    {this.renderHeaders()}
                    {this.renderBody()}
                    {this.renderFooter()}
                </Table>
            </TableContainer>
        );
    }
}

MakeTable.propTypes = {
    /**
     * The data to display in the table. Assumes the data is formatted correctly
     * @type {Array}
     */
    data: PropTypes.array.isRequired,
    /**
     * The headers of the table
     * @type {[String]}
     */
    headers: PropTypes.array.isRequired,
    /**
     * Flag that indicates if the table should be paginated
     * @type {Boolean}
     * @optional
     */
    paginated: PropTypes.bool,
    /**
     * Props to pass to [TablePagination]
     * @type {Object}
     * @optional - Only required if [props.paginated] is true
     */
    paginationProps: PropTypes.object,
};

MakeTable.defaultProps = {
    paginated: false,
    paginationProps: {},
};

export default MakeTable;