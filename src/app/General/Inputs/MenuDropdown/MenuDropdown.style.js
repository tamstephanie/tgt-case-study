export const MenuDropdownStyle = (theme) => ({
    menuDropdown: {
        marginLeft: "auto",
        minHeight: "inherit"
    },
    menuButton: {
        borderRadius: "0px",
        color: theme.palette.common.var1,
        minHeight: "inherit",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.main
        }
    },
    menu: {
        "& .MuiMenu-paper": {
            backgroundColor: theme.palette.common.var2,
            borderRadius: "0px",
            marginTop: "48px"
        },
        "& .MuiButtonBase-root": {
            fontSize: "1.15rem",
            "&:hover": {
                backgroundColor: theme.palette.common.var2,
            }
        },
        "& .MuiLink-root": {
            textDecorationLine: "underline",
            textDecorationStyle: "dotted",
            "&:hover": {
                textDecorationStyle: "dotted",
            }
        }
    }
});