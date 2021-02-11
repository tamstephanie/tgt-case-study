import React from "react";
import {mount} from "enzyme";

import {DepartureProvider} from "../DepartureContext";

describe("DepartureContext", () => {
    it("fetches the list of routers on mount", () => {
        const spy = jest.spyOn(DepartureProvider.prototype, "fetchRoutes");
        let context = mount(<DepartureProvider />);

        // Expect the fetchRoutes function to have been called once 
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockClear();
    });
});