import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Button, Link, Menu, MenuItem, withStyles} from "@material-ui/core";
import {KeyboardArrowDown} from '@material-ui/icons';

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
        this.setState({/*anchorEl: null, */open: false});
    };

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        });
    }

    render() {
        let {classes, isFirstChild} = this.props;
        let className = isFirstChild ? "" : " not-first-menu-dropdown";
        return (
            <div className={classes.menuDropdown + className}>
                <Button
                    className={classes.menuButton}
                    onClick={this.handleOpen}
                    endIcon={<KeyboardArrowDown />}
                    size="large"
                >
                    {this.props.menuTitle}
                </Button>
                <Menu
                    className={classes.menu}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose}
                    elevation={0}
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
     * Object meant for styling
     * @type {Object}
     */
    classes: PropTypes.object,
    /**
     * Indicates if this is the first menu.
     * @type {Boolean}
     */
    isFirstChild: PropTypes.bool,
};

MenuDropdown.defaultProps = {
    isFirstChild: false
}

export default withStyles(MenuDropdownStyle)(MenuDropdown);