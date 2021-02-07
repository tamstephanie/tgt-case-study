import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {AppBar, Container, Toolbar, Typography, withStyles} from "@material-ui/core";

import MetroTransitLogo from "content/images/metro-transit-logo.svg";

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
                    <Container>
                        <Toolbar>
                            <MetroTransitLogo />
                        </Toolbar>
                    </Container>
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
            // boxShadow: "none"
        },
        "& .MuiContainer-root": {
            padding: "0.5rem 0px"
        }
    }
});

export default withStyles(style)(UserActionBar);