import React from "react";
import {create} from "react-test-renderer";

import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
    it("should match the snapshot", () => {
        let page = create(<ErrorPage />);
        expect(page).toMatchSnapshot();
    });
});