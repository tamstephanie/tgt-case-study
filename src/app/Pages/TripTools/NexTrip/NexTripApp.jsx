import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import AppPage from "app/General/Containers/AppPage/AppPage";
import DepartureForm from "./DepartureForm/DepartureForm";
import DepartureTable from "./DepartureTable/DepartureTable";

/**
 * NexTrip page. It displays the form that lets the user search for live departure information
 */
class NexTripApp extends PureComponent {
    constructor(props) {
        super(props);
        this._tag = _.kebabCase(this.constructor.name);
    }

    render() {
        return (
            <div className={this._tag}>
                <AppPage title="NexTrip" subtitle="Real-time Departures">
                    <DepartureForm />
                    <DepartureTable />
                </AppPage>
            </div>
        );
    }
}

export default NexTripApp;