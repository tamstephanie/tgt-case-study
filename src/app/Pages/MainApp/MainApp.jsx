import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container, withStyles} from "@material-ui/core";

import AppContextProvider from "./AppContextProvider";
import HelpApp from "app/Pages/Help/HelpApp";
import LostFound from "app/Pages/Help/LostFound/LostFound"
import NexTripApp from "app/Pages/TripTools/NexTrip/NexTripApp";
import UserActionBar from "app/Pages/Navigation/UserActionBar/UserActionBar";
import {MainAppStyle} from "./MainApp.style";

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
                {/*NexTrip page*/}
                <Route exact path="/nextrip" component={NexTripApp} />
                
                {/*Help pages*/}
                <Route exact path="/lost-found" component={LostFound} />

                {/*Redirect automatically to NexTrip page*/}
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

export default withStyles(MainAppStyle)(MainApp);