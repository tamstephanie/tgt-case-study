export const MenuDropdownStyle = (theme) => ({
    menuDropdown: {
        minHeight: "inherit",
        "& .MuiButton-text": {
            borderRadius: "0px",
            marginLeft: "10px",
            minHeight: "inherit",
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.main
            }
        },
        "& .MuiMenu-paper": {
            backgroundColor: theme.palette.common.var2,
            borderRadius: "0px",
        },
        "& .MuiListItem-button": {
            "&:hover": {
                backgroundColor: theme.palette.common.var2
            }
        }
    }
});