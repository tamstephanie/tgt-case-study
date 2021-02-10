export const DepartureTableStyle = (theme) => ({
    liveDeparturesInfo: {
        backgroundColor: theme.palette.common.var2,
        marginBottom: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        width: "85%",

        // Style top part of the departures info container
        "& .stop-info-header": {
            padding: "15px 25px",
            "& .MuiTypography-h6": {
                float: "right"
            }
        },

        // Actual departures table styling
        "& .MuiTableContainer-root": {
            marginTop: "10px"
        },
        "& .MuiTableHead-root": {
            backgroundColor: theme.palette.warning.main
        },
        "& .MuiTableCell-root:first-child": {
            paddingLeft: "25px"
        },
        "& .MuiTableCell-root:last-child": {
            textAlign: "right",
            paddingRight: "30px"
        },
        "& .MuiTableFooter-root": {
            "& .MuiTableCell-root": {
                paddingRight: "10px"
            }
        },
        "& .pagination-actions": {
            display: "flex",
            marginLeft: "10px"
        },
    }
});