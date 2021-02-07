import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Route, Switch} from "react-router-dom";

import AppPage from "app/General/Containers/AppPage";
import DepartureForm from "./DepartureForm/DepartureForm";

class NexTripApp extends PureComponent {
    constructor(props) {
        super(props);
        this._tag = _.kebabCase(this.constructor.name);
    }

    render() {
        return (
            <div className={this._tag}>
                <AppPage title="NexTrip">
                    <DepartureForm />
                </AppPage>
            </div>
        );
    }
}

export default NexTripApp;