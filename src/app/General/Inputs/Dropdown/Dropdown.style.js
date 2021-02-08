export const DropdownStyle =  (theme) => ({
    dropdown: {
        "& .MuiSelect-root": {
            backgroundColor: theme.palette.common.main,
            color: theme.palette.common.var1,
            fontSize: "1.25rem",
            width: "100%"
        }
    },
    optionItem: {
        color: theme.palette.common.var1,
        fontSize: "1.25rem"
    }
});