import React from "react";
import chai from "chai";
import {mount} from "enzyme";
import {create} from "react-test-renderer";

import UserActionBar from "../UserActionBar";

/**
 * @TODO Find package or write transformer that allows Jest to understand non-JS files
 */
describe("UserActionBar", () => {
    it("matches the rendered snapshot", () => {
        let actionBar = create(<UserActionBar />);
        expect(actionBar).toMatchSnapshot();
    });

    it("displays two clickable menu dropdowns", () => {
        let actionBar = mount(<UserActionBar />);

        chai.expect(actionBar.find("MenuDropdown")).to.have.lengthOf(2);
    });
});