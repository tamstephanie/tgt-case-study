import {createMuiTheme} from "@material-ui/core";

// Theme palette colors
const common = {
    main: "#ffffff",
    var1: "#626462",
    var2: "#f0f0f0"
};
const primary = {
    main: "#0097d0",
    var1: "#047db5",
    var2: "#dbf4fd"
};
const secondary = {
    main: "#0053a0",
    var1: "#063d70",
    var2: "#add8ff"
};
const success = {
    main: "#008244",
    var1: "#00592e",
    var2: "#c5fcc7"
};
const warning = {
    main: "#ffd200",
    var1: "#f9b925",
    var2: "#fff27d"
};
const error = {
    main: "#ed1b2e",
    var1: "#b71c1c",
    var2: "#ffcdd2"
};

// Button styling
const defaultButton = {
    name: "default",
    standard: {
        color: primary.main,
        backgroundColor: common.main,
        borderColor: common.main
    },
    hover: {
        color: common.main,
        backgroundColor: primary.main,
        borderColor: primary.main
    }
};
const primaryButton = {
    name: "primary",
    standard: {
        color: common.main,
        backgroundColor: primary.main,
        borderColor: primary.main
    },
    hover: {
        color: common.main,
        backgroundColor: primary.var1,
        borderColor: primary.var1
    }
};
const secondaryButton = {
    name: "secondary",
    standard: {
        color: primary.var1,
        backgroundColor: primary.var2,
        borderColor: primary.var2
    },
    hover: {
        color: primary.var1,
        backgroundColor: primary.var2,
        borderColor: primary.var2
    }
};

// Provides all of the styling for a button
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

// Provides all of the styling for a toggle button
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
    palette: {common, primary, secondary, success, warning, error},
    overrides: {
        MuiAppBar: {
            colorDefault: {
                backgroundColor: common.main
            }
        },
        MuiButton: {
            root: {
                fontSize: "1.5rem",
                textTransform: "inherit",
                ...buttonBsStyle(defaultButton),
                ...buttonBsStyle(primaryButton),
                ...buttonBsStyle(secondaryButton)
            },
            textSizeLarge: {
                fontSize: "1.15rem"
            }
        },
        MuiMenu: {
            list: {
                borderRadius: "0px"
            },
            paper: {
                backgroundColor: common.var2,
                borderRadius: "0px"
            }
        },
        MuiToggleButtonGroup: {
            root: {
                backgroundColor: primary.main,
                borderColor: primary.main,
                color: common.main
            }
        },
        MuiToggleButton: {
            root: {
                textTransform: "inherit",
                ...toggleBtnBsStyle(secondaryButton)
            },
            sizeLarge: {
                fontSize: "1.35rem",
                padding: "0.5rem 1.25rem"
            }
        }
    },
    typography: {
        fontFamily: [
            "proxima-nova",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif"
        ].join(","),
        h1: {
            fontSize: "2.45rem",
            fontWeight: "bold"
        },
        h2: {
            color: common.var1,
            fontSize: "1.95rem",
            fontWeight: "bold"
        },
        h6: {
            color: common.var1,
        },
        body1: {
            color: common.var1,
            fontSize: "1.15rem"
        }
    },
});