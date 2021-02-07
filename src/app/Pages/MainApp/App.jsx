import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Button, Container, withStyles} from "@material-ui/core";

import AppContextProvider from "./AppContextProvider";
import DepartureForm from "app/Pages/LiveDepartures/DepartureForm/DepartureForm";
import UserActionBar from "app/UserActionBar/UserActionBar";

/**
 * Front page of the application
 */
class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    renderMain() {
        /**
         * @TODO Render a couple of routes so I prove I know react-router stuff
         */
        return (
            <div>
                <Button variant="contained" color="primary">Plan a Trip!</Button>
            </div>
        )
    }

    render() {
        let {classes} = this.props;
        return (
            <Container maxWidth="xl" className={classes.app}>
                <AppContextProvider>
                    <UserActionBar />
                    <DepartureForm />
                </AppContextProvider>
            </Container>
        );
    }
}

App.propTypes = {
    /**
     * Object containing styling
     * @type {Object}
     */
    classes: PropTypes.object
};

const style = (theme) => ({
    app: {
        padding: "0px"
    }
});

export default withStyles(style)(App);