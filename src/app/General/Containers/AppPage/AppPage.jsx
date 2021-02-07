import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Typography, withStyles} from "@material-ui/core";

class AppPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-page-content">
                <Typography variant="h5"><b>{this.props.title}</b></Typography>
                {this.props.children}
            </div>
        );
    }
}

AppPage.propTypes = {
    /**
     * Text to display at the top of the page
     * @type {String}
     */
    title: PropTypes.string.isRequired,
};

export default AppPage;