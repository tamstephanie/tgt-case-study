import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {AppBar, Container, Divider, Toolbar, withStyles} from "@material-ui/core";

import MenuDropdown from "app/General/Inputs/MenuDropdown/MenuDropdown";
import MetroTransitLogo from "content/images/metro-transit-logo.svg";
import {UserActionBarStyle} from "./UserActionBar.style";

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
                            <div className="clickable-icon">
                                <MetroTransitLogo onClick={() => {window.location.href="#/"}} />
                            </div>
                            <MenuDropdown
                                menuTitle="Trip Tools"
                                menuItems={[
                                    {link: "/nextrip", text: "NexTrip"},
                                ]}
                                isFirstChild
                            />
                            <MenuDropdown
                                menuTitle="Help"
                                menuItems={[
                                    {link: "/lost-found", text: "Lost & Found"},
                                ]}
                            />
                            <Divider orientation="vertical" />
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

export default withStyles(UserActionBarStyle)(UserActionBar);