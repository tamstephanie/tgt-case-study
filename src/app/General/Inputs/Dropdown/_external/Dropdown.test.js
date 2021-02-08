import React from "react";
import _ from "lodash";
import chai from "chai";
import {mount} from "enzyme";
import {create} from "react-test-renderer";

import Dropdown from "../Dropdown";
import {OPTIONS_COMPLEX, OPTIONS_SIMPLE} from "./data.mock";

const COMPONENT_NAME = "Dropdown";

describe(COMPONENT_NAME, () => {
    it("renders a dropdown with simple options", () => {
        let dropdown = mount(
            <Dropdown
                selectedValue=""
                options={OPTIONS_SIMPLE}
                onChange={jest.fn()}
                emptyOption="Select a fruit"
            />
        );
        
        // expect(dropdown).toMatchSnapshot();
    });

    it("updates the selected value on ", () => {
        let dropdown = mount(
            <Dropdown
                selectedValue=""
                options={OPTIONS_SIMPLE}
                onChange={jest.fn()}
                emptyOption="Select a fruit"
            />
        );

        dropdown.find("input").invoke("onChange")({
            event: {target: {value: "Lemon"}}
        });
        chai.expect(dropdown.prop("selectedValue")).to.equal("Lemon");
    });
});