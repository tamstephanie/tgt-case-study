export const ErrorPageStyle = (theme) => ({
    errorPage: {
        "& .app-page": {
            "& .MuiCard-root": {
                backgroundColor: theme.palette.secondary.main,
                "& .MuiTypography-root": {
                    color: theme.palette.common.main
                }
            }
        }
    }
});