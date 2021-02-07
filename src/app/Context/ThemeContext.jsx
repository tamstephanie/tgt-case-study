import {createMuiTheme} from "@material-ui/core";
import _ from "lodash";

const themeDefault = {
    main: "#FFF",
    var1: "",
    var2: ""
};
const primary = {
    main: "#0097D0",
    var1: "#047DB5",
    var2: "#DBF4FD"
};
const secondary = {
    main: "#0053A0"
};
const success = {
    main: "#008244",
    var1: "",
    var2: ""
};
const warning = {
    main: "#FFD200",
    var1: "",
    var2: ""
};
const error = {
    main: "#ED1B2E",
    var1: "",
    var2: ""
};

// Button styling
const defaultButton = {
    name: "default",
    standard: {
        color: primary['main'],
        backgroundColor: themeDefault['main'],
        borderColor: themeDefault['main']
    },
    hover: {
        color: themeDefault['main'],
        backgroundColor: primary['main'],
        borderColor: primary['main']
    }
};
const primaryButton = {
    name: "primary",
    standard: {
        color: themeDefault['main'],
        backgroundColor: primary['main'],
        borderColor: primary['main']
    },
    hover: {
        color: themeDefault['main'],
        backgroundColor: primary['var1'],
        borderColor: primary['var1']
    }
};
const secondaryButton = {
    name: "secondary",
    standard: {
        color: primary['var1'],
        backgroundColor: primary['var2'],
        borderColor: primary['var2']
    },
    hover: {
        color: primary['var1'],
        backgroundColor: primary['var2'],
        borderColor: primary['var2']
    }
};


function buttonBsStyle({name, standard, hover}) {
    const btnBaseName = `&.${name}`;
    return {
        // Base button styling
        [btnBaseName]: {
            ...standard,
            borderRadius: "2px",
            borderWidth: "1px",
            borderStyle: "solid"
        },

        // Button state styling
        [`${btnBaseName}:hover`]: getHoverStyle(hover),
        [`${btnBaseName}:focus`]: getHoverStyle(hover),
        [`${btnBaseName}:active`]: getHoverStyle(hover),
        [`${btnBaseName}.active`]: getHoverStyle(hover),
        [`${btnBaseName}:open &.dropdown-toggle`]: getHoverStyle(hover),

        [`.open .dropdown-toggle${btnBaseName}`]: {
            backgroundImage: "none"
        },

        // Styling for disabled version of the button
        [`${btnBaseName}.disabled`]: getDisabledStyle(standard),
        [`${btnBaseName}[disabled]`]: getDisabledStyle(standard),
        [`& fieldset[disabled] .${name}`]: getDisabledStyle(standard),
        [`${btnBaseName}.disabled:hover`]: getDisabledStyle(standard),
        [`${btnBaseName}[disabled]:hover`]: getDisabledStyle(standard),
        [`& fieldset[disabled] .${name}:hover`]: getDisabledStyle(standard),
        [`${btnBaseName}.disabled:focus`]: getDisabledStyle(standard),
        [`${btnBaseName}[disabled]:focus`]: getDisabledStyle(standard),
        [`& fieldset[disabled] .${name}:focus`]: getDisabledStyle(standard),
        [`${btnBaseName}.disabled:active`]: getDisabledStyle(standard),
        [`${btnBaseName}[disabled]:active`]: getDisabledStyle(standard),
        [`& fieldset[disabled] .${name}:active`]: getDisabledStyle(standard),
        [`${btnBaseName}.disabled.active`]: getDisabledStyle(standard),
        [`${btnBaseName}[disabled].active`]: getDisabledStyle(standard),
        [`& fieldset[disabled] .${name}.active`]: getDisabledStyle(standard),

        [`${btnBaseName} .badge`]: {
            color: standard.color,
            backgroundColor: standard.backgroundColor
        }
    }
}

function toggleBtnBsStyle({standard, hover}) {
    return {
        // Base button styling
        ...standard,

        // Button state styling
        "&:hover": getHoverStyle(hover),
        "&:focus": getHoverStyle(hover),
        "&:active": getHoverStyle(hover),
        "&.active": getHoverStyle(hover),
        "&:open &.dropdown-toggle": getHoverStyle(hover),

        ".open .dropdown-toggle": {
            backgroundImage: "none"
        },

        // Styling for disabled version of the button
        "&.disabled": getDisabledStyle(standard),
        "&[disabled]": getDisabledStyle(standard),
        "& fieldset[disabled]": getDisabledStyle(standard),
        "&.disabled:hover": getDisabledStyle(standard),
        "&[disabled]:hover": getDisabledStyle(standard),
        "& fieldset[disabled]:hover": getDisabledStyle(standard),
        "&.disabled:focus": getDisabledStyle(standard),
        "&[disabled]:focus": getDisabledStyle(standard),
        "& fieldset[disabled]:focus": getDisabledStyle(standard),
        "&disabled:active": getDisabledStyle(standard),
        "&[disabled]:active": getDisabledStyle(standard),
        "& fieldset[disabled]:active": getDisabledStyle(standard),
        "&.disabled.active": getDisabledStyle(standard),
        "&[disabled].active": getDisabledStyle(standard),
        "& fieldset[disabled].active": getDisabledStyle(standard),

        "&.badge": {
            color: standard.color,
            backgroundColor: standard.backgroundColor
        }
    }
}

// Style the button's disabled look
function getDisabledStyle(standard) {
    return {
        color: standard.color,
        backgroundColor: standard.backgroundColor,
        opacity: ".65"
    }
}

// Style the button for :hover state
function getHoverStyle(hover) {
    return {...hover};
}

export const theme = createMuiTheme({
    palette: {default: themeDefault, primary, secondary, success, warning, error},
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: themeDefault['main']
            }
        },
        MuiButton: {
            root: {
                ...buttonBsStyle(defaultButton),
                ...buttonBsStyle(primaryButton),
                ...buttonBsStyle(secondaryButton)
            }
        },
        MuiToggleButton: {
            root: {
                ...toggleBtnBsStyle(secondaryButton)
            }
        },
    }
});