import React, {PureComponent} from "react";
import _ from "lodash";

import DepartureForm from "./DepartureForm/DepartureForm";

class LiveDeparturesApp extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <DepartureForm />
            </React.Fragment>
        );
    }
}

export default LiveDeparturesApp;