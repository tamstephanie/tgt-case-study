export const DepartureFormStyle = (theme) => ({
    departureSearch: {
        fontSize: "1.15rem",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        maxWidth: "40%",
    },
    departureSearchToggle: {
        marginBottom: "30px",
        textAlign: "center",
        "& .Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: "#FFF"
        }
    },
    departureDropdowns: {
        marginBottom: "50px",
        "& .MuiFormControl-root": {
            color: theme.palette.common.var1,
            marginBottom: "15px"
        }
    },
    departureSearchForm: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    stopIdInput: {
        "& .MuiTextField-root": {
            fontSize: "1.15rem",
            marginBottom: "50px"
        },
        "& .MuiButton-root": {
            marginRight: "-10px",
            padding: "0px",
            "&:hover": {
                backgroundColor: theme.palette.common.main
            }
        }
    }
});