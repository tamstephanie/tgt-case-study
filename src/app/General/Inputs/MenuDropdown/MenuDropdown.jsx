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
            anchor: null,
            open: false,
        };
    }

    handleClose = () => {
        this.setState({anchor: null, open: false});
    };

    handleOpen = (event) => {
        this.setState({
            anchor: event.currentTarget,
            open: true
        });
    }

    render() {
        let {classes} = this.props;
        return (
            <div className={classes.menuDropdown}>
                <Button
                    onClick={this.handleOpen}
                    endIcon={<KeyboardArrowDown />}
                    size="large"
                >
                    {this.props.menuTitle}
                </Button>
                <Menu
                    anchorEl={this.state.anchor}
                    open={this.state.open}
                    onClose={this.handleClose}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
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
};

export default withStyles(MenuDropdownStyle)(MenuDropdown);