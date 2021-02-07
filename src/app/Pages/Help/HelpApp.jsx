import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Route, Switch} from "react-router-dom";

import AppPage from "app/General/Containers/AppPage";

class HelpApp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppPage title="Help">

            </AppPage>
        );
    }
}

export default HelpApp;