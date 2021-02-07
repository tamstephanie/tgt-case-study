import React from "react";
import _ from "lodash";

import chai from "chai";
import {mount} from "enzyme";

import Dropdown from "../Dropdown";
import {OPTIONS_COMPLEX, OPTIONS_SIMPLE} from "./data.mock";

const COMPONENT_NAME = "Dropdown";

describe(COMPONENT_NAME, () => {
    it("displays a dropdown when given a simple list of strings", () => {
        let dropdown = mount(<Dropdown onChange={jest.fn()} options={OPTIONS_SIMPLE} />);

        let menuItems = dropdown.find("ForwardRef(MenuItem)");
        chai.expect(menuItems).to.have.lengthOf(12);
        _.forEach(menuItems, (menuItem) => {
            chai.expect(_.include(OPTIONS_SIMPLE, menuItem.text())).to.be.true;
        });
    })
});