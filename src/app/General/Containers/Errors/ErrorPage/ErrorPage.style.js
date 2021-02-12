export const ErrorPageStyle = (theme) => ({
    errorPage: {
        "& .app-page": {
            "& .MuiCard-root": {
                backgroundColor: theme.palette.secondary.main,
                "& .MuiTypography-root": {
                    color: theme.palette.common.main
                }
            }
        },
        "& .error-page-content": {
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
        },
        "& .MuiButton-outlined": {
            marginTop: "50px"
        }
    }
});