import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {AppBar, Toolbar, Typography, withStyles} from "@material-ui/core";

import MetroTransitLogo from "../../content/images/metro-transit-logo.svg";

/**
 * Toolbar that contains various global app functions
 */
class UserActionBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let {classes} = this.props;
        return (
            <div className={classes.actionBar}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <MetroTransitLogo />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

UserActionBar.propTypes = {
    /**
     * Object meant for styling
     * @type {Object}
     */
    classes: PropTypes.object,
};

/**
 * Custom styling for the component
 */
const style = (theme) => ({
    actionBar: {
        "& .MuiAppBar-root": {
            boxShadow: "none"
        },
        "& .MuiToolbar-root": {
            minHeight: "70px",
        }
    }
});

export default withStyles(style)(UserActionBar);