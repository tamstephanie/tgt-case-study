import React from "react";
import chai from "chai";
import {mount} from "enzyme";

import Dropdown from "../Dropdown";
import {OPTIONS_COMPLEX, OPTIONS_SIMPLE} from "./data.mock";

const COMPONENT_NAME = "Dropdown";

describe(COMPONENT_NAME, () => {
    it("has 13 options when given a simple list and empty option is allowed", () => {
        let dropdown = mount(
            <Dropdown
                selectedValue=""
                options={OPTIONS_SIMPLE}
                onChange={jest.fn()}
                emptyOption="Select a fruit"
            />
        );

        // Expect 13 options in the dropdown list
        chai.expect(dropdown.find("option")).to.have.lengthOf(13);
    });

    it("accepts a list of objects, properly formatted as {value, label}", () => {
        let dropdown = mount(
            <Dropdown
                selectedValue=""
                options={OPTIONS_COMPLEX}
                onChange={jest.fn()}
                emptyOption="Select a route"
            />
        );

        // Expect the dropdown to have 6 options + an empty option, so 7 total
        chai.expect(dropdown.find("option")).to.have.lengthOf(7);

        // Expect the second option's value and display to be correct
        let option2 = dropdown.find("option").at(1);
        chai.expect(option2.prop("value")).to.equal("901");
        chai.expect(option2.text()).to.equal("METRO Blue Line");
    });
});