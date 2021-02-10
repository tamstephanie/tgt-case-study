import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {IconButton} from "@material-ui/core";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@material-ui/icons";

class PaginationActions extends Component {
    constructor(props) {
        super(props);
        this.handleBackBtnClick = this.handleBackBtnClick.bind(this);
        this.handleFirstBtnClick = this.handleFirstBtnClick.bind(this);
        this.handleLastBtnClick = this.handleLastBtnClick.bind(this);
        this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
    }

    handleBackBtnClick = (event) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleFirstBtnClick = (event) => {
        this.props.onChangePage(event, 0);
    };

    handleLastBtnClick = (event) => {
        let lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
        this.props.onChangePage(event, lastPage);
    };

    handleNextBtnClick = (event) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    render() {
        let {page, count, rowsPerPage} = this.props;
        let disablePrevBtns = page === 0;
        let disableNextBtns = page >= Math.ceil(count / rowsPerPage) - 1;
        return (
            <div className="pagination-actions">
                <IconButton onClick={this.handleFirstBtnClick} disabled={disablePrevBtns} aria-label="first page">
                    <FirstPage />
                </IconButton>
                <IconButton onClick={this.handleBackBtnClick} disabled={disablePrevBtns} aria-label="previous page">
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton onClick={this.handleNextBtnClick} disabled={disableNextBtns} aria-label="next page">
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton onClick={this.handleLastBtnClick} disabled={disableNextBtns} aria-label="last page">
                    <LastPage />
                </IconButton>
            </div>
        );
    }
}

PaginationActions.propTypes = {
    /**
     * Total number of entries in the table
     * @type {Number}
     */
    count: PropTypes.number.isRequired,
    /**
     * Function that handles changing the page
     * @type {Function}
     */
    onChangePage: PropTypes.func.isRequired,
    /**
     * Current page of the table
     * @type {Number}
     */
    page: PropTypes.number.isRequired,
    /**
     * The current page size of the table
     * @type {Number}
     */
    rowsPerPage: PropTypes.number.isRequired
};

export default PaginationActions;