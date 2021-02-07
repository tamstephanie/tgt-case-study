import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container, withStyles} from "@material-ui/core";

import AppContextProvider from "./AppContextProvider";
import HelpApp from "app/Pages/Help/HelpApp";
import NexTripApp from "app/Pages/TripTools/NexTrip/NexTripApp";
import UserActionBar from "app/Pages/Navigation/UserActionBar/UserActionBar";

/**
 * Front page of the application
 */
class MainApp extends Component {
    constructor(props) {
        super(props);
    }

    renderMain() {
        return (
            <Switch>
                <Route exact path="/nextrip" component={NexTripApp} />
                <Route exact path="/help" component={HelpApp} />
                <Redirect exact from="/" to="/nextrip" />
            </Switch>
        )
    }

    render() {
        let {classes} = this.props;
        return (
            <Container maxWidth="xl" className={classes.mainApp}>
                <AppContextProvider>
                    <UserActionBar />
                    {this.renderMain()}
                </AppContextProvider>
            </Container>
        );
    }
}

MainApp.propTypes = {
    /**
     * Object containing styling
     * @type {Object}
     */
    classes: PropTypes.object
};

const style = (theme) => ({
    mainApp: {
        padding: "0px"
    }
});

export default withStyles(style)(MainApp);