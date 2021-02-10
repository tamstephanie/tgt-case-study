import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
    Table, TableBody, TableCell, TableContainer, TableFooter, TableHead,
    TablePagination, TableRow, Typography
} from "@material-ui/core";

class StandardTable extends Component {
    constructor(props) {
        super(props);
    }

    renderBody() {
        return (
            <TableBody>
                {_.map(this.props.data, (dataItem, index) => (
                    <TableRow key={index}>
                        {_.map(dataItem, (value, key) => (
                            <TableCell key={key}>
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
                <TableRow>
                    {_.map(this.props.headers, (header) => (
                        <TableCell key={header}>
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

/**
 * {@see MakeTable.propTypes} for all passed props
 */
StandardTable.propTypes = {};

StandardTable.defaultProps = {
    paginated: false,
    paginationProps: {},
    rotated: false,
};

export default StandardTable;