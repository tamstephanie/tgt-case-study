export const AppPageStyle = (theme) => ({
    header: {
        backgroundColor: theme.palette.secondary.main,
        marginBottom: "50px",
        minHeight: "250px",
        "& .app-title-card": {
            padding: "7.25rem 0rem 2rem 2.75rem"
        }
    },
    appTitle: {
        backgroundColor: "rgb(255, 255, 255, 0.7)",
        borderRadius: "0px",
        boxShadow: "none",
        maxWidth: "fit-content",
        "& .MuiCardContent-root": {
            color: theme.palette.secondary.main,
            padding: "1rem",
            textAlign: "center"
        },
        "& .MuiTypography-root": {
            lineHeight: "revert"
        }
    },
    content: {
        "& .subtitle": {
            color: theme.palette.common.var1,
            textAlign: "center"
        }    
    }
});