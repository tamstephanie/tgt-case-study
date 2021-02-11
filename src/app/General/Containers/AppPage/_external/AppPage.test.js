import React from "react";
import chai from "chai";
import {mount} from "enzyme";
import {create} from "react-test-renderer";

import AppPage from "../AppPage";

describe("AppPage", () => {
    it("should match the rendered snapshot", () => {
        let page = create(<AppPage title="Sample Page" />);
        expect(page).toMatchSnapshot();
    });

    it("should always display a page title", () => {
        let page = mount(<AppPage title="Sample Page" />);

        // Expect a page title to exist and match the provided text
        chai.expect(page.find(".MuiTypography-h1")).to.have.lengthOf(1);
        chai.expect(page.find(".MuiTypography-h1").text()).to.equal("Sample Page");

        // Expect there to be no subtitle since none was given
        chai.expect(page.find(".subtitle")).to.have.lengthOf(0);
    });

    it("should display a subtitle, if provided", () => {
        let page = mount(<AppPage title="Sample Page" subtitle="Sample Subtitle" />);
        
        // Expect a subtitle to exist and match the provided text
        chai.expect(page.find(".MuiTypography-h2")).to.have.lengthOf(1);
        chai.expect(page.find(".MuiTypography-h2").text()).to.equal("Sample Subtitle");
    });
});