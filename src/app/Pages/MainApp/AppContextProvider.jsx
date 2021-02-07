import React, {PureComponent} from "react";
import _ from "lodash";
import {MuiThemeProvider} from "@material-ui/core";

import {DepartureProvider} from "app/Context/DepartureContext";
import {theme} from "app/Context/ThemeContext";

/**
 * Component that handles setting up providers necessary for the app to render properly
 */
class AppContextProvider extends PureComponent {
    render() {
        return (
            <DepartureProvider>
                <MuiThemeProvider theme={theme}>
                    {this.props.children}
                </MuiThemeProvider>
            </DepartureProvider>
        );
    }
}

export default AppContextProvider;