import React from "react";
import _ from "lodash";
import chai from "chai";
import {mount} from "enzyme";
import MenuDropdown from "../MenuDropdown";

const COMPONENT_NAME = "MenuDropdown";
const EXAMPLE_ITEMS = [
    {link: "/example1", text: "Example Link 1"},
    {link: "/example2", text: "Example Link 2"},
    {link: "/example3", text: "Example Link 3"},
];
const MENU_BTN = "ForwardRef(Button)";
const MENU_ITEM_BTN = ".MuiMenuItem-root.MuiButtonBase-root";

describe(COMPONENT_NAME, () => {
    it("opens a menu with three links when clicked", () => {
        let menu = mount(<div><MenuDropdown menuTitle="Example" menuItems={EXAMPLE_ITEMS} /></div>);

        // Verify that no menu items are presently displayed
        chai.expect(menu.find(MENU_ITEM_BTN)).to.have.lengthOf(0);

        // Create a HTMLElement from the html string of the button and pass it as the currentTarget
        // when clicking the button
        let menuButton = menu.find(MENU_BTN);
        let elem = new DOMParser().parseFromString(menuButton.html(), "text/html");
        menuButton.invoke("onClick")({event: {currentTarget: elem.body}});

        // Verify that there are three items in the menu that are clickable
        chai.expect(menu.find(MENU_ITEM_BTN)).to.have.lengthOf(3);
    });
});