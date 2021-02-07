export const AppPageStyle = (theme) => ({
    header: {
        backgroundColor: theme.palette.secondary.main,
        marginBottom: "50px",
        minHeight: "250px",
        "& .app-title-card": {
            padding: "125px 0px 25px 65px"
        }
    },
    appTitle: {
        backgroundColor: "rgb(255, 255, 255, 0.7)",
        borderRadius: "0px",
        boxShadow: "none",
        maxWidth: "fit-content",
        "& .MuiCardContent-root": {
            color: theme.palette.secondary.main,
            padding: "16px",
            textAlign: "center"
        }
    }
});