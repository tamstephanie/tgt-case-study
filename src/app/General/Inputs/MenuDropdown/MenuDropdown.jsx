import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Button, Link, Menu, MenuItem, withStyles} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@material-ui/icons';

import MountedComponent from "app/Utilities/MountedComponent";
import {MenuDropdownStyle} from "./MenuDropdown.style";

/**
 * Renders a button that displays a menu with each item as a link
 */
class MenuDropdown extends MountedComponent {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        });
    }

    render() {
        let {classes, isFirstChild} = this.props;
        let className = isFirstChild ? "" : "-not-first";
        return (
            <div className={classes.menuDropdown + ` menu-dropdown${className}`}>
                {/**
                 * Maybe try using ToggleButton to get that active state styling
                 */}
                <Button
                    className={classes.menuButton + " menu-btn"}
                    onClick={this.handleOpen}
                    endIcon={this.state.open ? <ExpandLess /> : <ExpandMore />}
                    size="large"
                    disableRipple
                >
                    {this.props.menuTitle}
                </Button>
                <Menu
                    className={classes.menu + " menu"}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                    anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                    getContentAnchorEl={null}
                    elevation={0}
                    autoFocus={false}
                    variant="menu"
                >
                    {_.map(this.props.menuItems, (menuItem, index) => (
                        <MenuItem key={index} onClick={this.handleClose}>
                            <Link href={`#${menuItem.link}`}>{menuItem.text}</Link>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

MenuDropdown.propTypes = {
    /**
     * List of menu items in the dropdown
     * @type {Array}
     */
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        /**
         * The URL of the page to redirect to
         * @type {String}
         */
        link: PropTypes.string.isRequired,
        /**
         * The text to display for the link
         * @type {String}
         */
        text: PropTypes.string.isRequired
    })).isRequired,
    /**
     * The name of the section
     * @type {String}
     */
    menuTitle: PropTypes.string.isRequired,
    /**
     * JSON object of CSS styling, which is then applied to the corresponding component(s)
     * @type {JSS}
     * @optional
     */
    classes: PropTypes.object,
    /**
     * Indicates if this is the first menu.
     * @type {Boolean}
     * @optional
     */
    isFirstChild: PropTypes.bool
};

MenuDropdown.defaultProps = {
    isFirstChild: false
}

export default withStyles(MenuDropdownStyle)(MenuDropdown);