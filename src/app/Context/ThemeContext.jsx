import {createMuiTheme} from "@material-ui/core";
import _ from "lodash";

const themeDefault = {
    main: "#ffffff"
};
const primary = {
    main: "#0097d0"
};
const secondary = {
    main: "#0053a0"
};
const success = {
    main: "#008244"
};
const warning = {
    main: "#ffd200"
};
const error = {
    main: "#ed1b2e"
};

export const theme = createMuiTheme({
    palette: {default: themeDefault, primary, secondary, success, warning, error},
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: themeDefault['main']
            }
        }
    }
});