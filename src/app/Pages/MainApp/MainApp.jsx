import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Redirect, Route, Switch} from "react-router-dom";
import {Grid, withStyles} from "@material-ui/core";

import AppContextProvider from "./AppContextProvider";
import ErrorPage from "app/General/Containers/Errors/ErrorPage/ErrorPage";
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
                {/* NexTrip page */}
                <Route exact path="/nextrip" component={NexTripApp} />
                
                {/* Help pages */}
                <Route exact path="/lost-found" component={LostFound} />
                
                {/* Redirect automatically to NexTrip page */}
                <Redirect exact from="/" to="/nextrip" />

                {/* On invalid path, display ErrorPage. Must be last to catch not include "/" path */}
                <Route path="*" component={ErrorPage} />
            </Switch>
        )
    }

    render() {
        let {classes} = this.props;
        return (
            <AppContextProvider>
                <Grid container className="app-grid">
                    <Grid item xs={12} className={classes.mainContent + " main-content"}>
                        <UserActionBar />
                        {this.renderMain()}
                    </Grid>
                </Grid>
            </AppContextProvider>
        );
    }
}

MainApp.propTypes = {
    /**
     * JSON object of CSS styling, which is then applied to the corresponding component(s)
     * @type {JSS}
     * @optional
     */
    classes: PropTypes.object
};

export default withStyles(MainAppStyle)(MainApp);