export const MenuDropdownStyle = (theme) => ({
    menuDropdown: {
        marginLeft: "auto",
        minHeight: "inherit"
    },
    menuButton: {
        borderRadius: "0px",
        minHeight: "inherit",
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