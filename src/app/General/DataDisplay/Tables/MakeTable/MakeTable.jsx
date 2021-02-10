import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import StandardTable from "./StandardTable";
import RotatedTable from "./RotatedTable";

class MakeTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let omittedProps = ['rotated'];
        if (!this.props.paginated) {
            omittedProps.push('paginationProps');
        }

        let passedProps = _.omit(this.props, omittedProps);
        return (!this.props.rotated ?
            <StandardTable {...passedProps} /> : <RotatedTable {...passedProps} />
        );
    }
}

MakeTable.propTypes = {
    /**
     * 
     */
    data: PropTypes.array.isRequired,
    /**
     * @type {[String]}
     */
    headers: PropTypes.array.isRequired,
    /**
     * Flag that indicates if the table should be paginated
     * @type {Boolean}
     */
    paginated: PropTypes.bool,
    /**
     * Props to pass to [TablePagination]
     * @type {Object}
     */
    paginationProps: PropTypes.object,
    /**
     * Flag that indicates if the table should be rotated, with the headers as the first column
     * @type {Boolean}
     */
    rotated: PropTypes.bool,
};

MakeTable.defaultProps = {
    paginated: false,
    paginationProps: {},
    rotated: false,
};

export default MakeTable;