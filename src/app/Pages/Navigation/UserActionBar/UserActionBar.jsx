import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {AppBar, Divider, Toolbar, withStyles} from "@material-ui/core";

import MenuDropdown from "app/General/Inputs/MenuDropdown/MenuDropdown";
import MetroTransitLogo from "content/images/metro-transit-logo.svg";
import {UserActionBarStyle} from "./UserActionBar.style";

/**
 * Toolbar that contains various global app functions
 */
class UserActionBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes} = this.props;
        return (
            <div className={classes.actionBar + " action-bar"}>
                <AppBar position="sticky" color="default">
                    <Toolbar disableGutters>
                        <div className="clickable-icon">
                            <MetroTransitLogo onClick={() => {window.location.href="#"}} />
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
                </AppBar>
            </div>
        );
    }
}

UserActionBar.propTypes = {
    /**
     * JSON object of CSS styling, which is then applied to the corresponding component(s)
     * @type {JSS}
     * @optional
     */
    classes: PropTypes.object
};

export default withStyles(UserActionBarStyle)(UserActionBar);