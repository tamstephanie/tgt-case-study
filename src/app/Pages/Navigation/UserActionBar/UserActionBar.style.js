export const UserActionBarStyle = (theme) => ({
    actionBar: {
        overflow: "hidden",
        "& .MuiAppBar-root": {
            boxShadow: "none"
        },
        "& .MuiToolbar-root": {
            margin: "0rem 5.5rem",
            minHeight: "75px"
        },
        "& .clickable-icon": {
            cursor: "pointer"
        },
        "& .not-first-menu-dropdown": {
            marginLeft: "0rem"
        },
    },
});