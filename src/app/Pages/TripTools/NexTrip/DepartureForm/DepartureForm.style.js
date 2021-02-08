export const DepartureFormStyle = (theme) => ({
    departureSearch: {
        fontSize: "1.15rem",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "40%",
        "& .MuiToggleButtonGroup-root": {
            marginBottom: "45px",
            marginLeft: "auto",
            marginRight: "auto",
            "& .Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                color: "#FFF"
            }
        }
    },
    departureDropdowns: {
        "& .MuiFormControl-root": {
            color: theme.palette.common.var1,
            marginBottom: "15px"
        }
    },
    departureSearchForm: {
        marginLeft: "auto",
        marginRight: "auto",
        "& .MuiInput-root": {
            fontSize: "1.15rem"
        }
    }
});