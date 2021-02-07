import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {FormControl, InputLabel, MenuItem, Select, withStyles} from "@material-ui/core";

/**
 * Basic component that renders a Material UI Select dropdown
 */
class Dropdown extends Component {
    render() {
        let {disabled, emptyOption, classes, color, inputLabel, options, selectedValue} = this.props;
        return (
            <FormControl className={classes.dropdown} disabled={disabled} fullWidth color={color}>
                {!_.isEmpty(inputLabel) && (
                    <InputLabel>{inputLabel}</InputLabel>
                )}
                <Select
                    value={selectedValue}
                    onChange={this.props.onChange}
                    displayEmpty={!_.isEmpty(emptyOption) ? true : false}
                    variant="outlined"
                >
                    {!_.isEmpty(emptyOption) && (
                        <MenuItem className={classes.optionItem} key="empty" value="">{emptyOption}</MenuItem>
                    )}
                    {_.map(options, (option) => {
                        let label, value;
                        if (_.isString(option) || _.isNumber(option)) {
                            value = option;
                        } else if (_.isObject(option)) {
                            value = _.get(option, "value");
                            label = _.get(option, "label");
                        }

                        return (
                            <MenuItem className={classes.optionItem} key={value} value={value}>
                                {!_.isNil(label) ? label : value}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        );
    }

}

Dropdown.propTypes = {
    /**
     * Function that controls the behavior of the dropdown 
     * @type {Function}
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Any acceptable value for [MuiSelect]
     * @type {String | Number | Array}
     */
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    /**
     * Indicates if the dropdown should be disabled
     */
    disabled: PropTypes.bool,
    /**
     * The text to display if an empty option is allowed
     * @type {String}
     */
    emptyOption: PropTypes.string,
    /**
     * An input label to display
     * @type {String}
     */
    inputLabel: PropTypes.string,
    /**
     * Indicates if multiple values are allowed at once
     * @type {Boolean}
     */
    multi: PropTypes.bool,
    /**
     * List of dropdown options
     * @type {Number []| String[] | Object[]}
     */
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ])),
    color: PropTypes.oneOf(["primary", "secondary"])
};

Dropdown.defaultProps = {
    disabled: false,
    emptyOption: "",
    inputLabel: "",
    multi: false,
    options: []
};

const style = (theme) => ({
    dropdown: {
        "& .MuiSelect-root": {
            fontSize: "1.15rem",
            width: "100%"
        }
    },
    optionItem: {
        fontSize: "1.15rem"
    }
});

export default withStyles(style)(Dropdown);