import React from "react";
import _ from "lodash";
import chai from "chai";
import {mount, shallow} from "enzyme";

import MakeTable from "../MakeTable";
import {COMPLEX_DATA, SIMPLE_DATA} from "./data.mock";

describe("MakeTable", () => {
    it("should display a single-column table", () => {
        let table = shallow(<MakeTable data={SIMPLE_DATA.data} headers={SIMPLE_DATA.headers} />);

        // Expect 1 column and verify that the text is correct
        chai.expect(table.find(".table-head-cell")).to.have.lengthOf(1);
        chai.expect(table.find(".table-head-cell").text()).to.equal("Fruits");

        // Expect 13 rows of data to be present
        chai.expect(table.find(".table-body-row")).to.have.lengthOf(13);
    });

    it("should allow displaying complex data", () => {
        let table = shallow(<MakeTable data={COMPLEX_DATA.data} headers={COMPLEX_DATA.headers} />);

        // Expect 2 columns in the table
        chai.expect(table.find(".table-head-cell")).to.have.lengthOf(2);
        chai.expect(table.find(".table-head-cell").at(0).text()).to.equal("Name");
        chai.expect(table.find(".table-head-cell").at(1).text()).to.equal("Age");

        // Expect 4 rows of data
        chai.expect(table.find(".table-body-row")).to.have.lengthOf(4);

        // Expect the first row to display properly
        let row1 = table.find(".table-body-row").at(0);
        chai.expect(row1.find(".table-body-cell").at(0).text()).to.equal("Charlie");
        chai.expect(row1.find(".table-body-cell").at(1).text()).to.equal("24");
    });

    it("displays pagination when flag is set and required props are provided", () => {
        let table = mount(
            <MakeTable
                data={SIMPLE_DATA.data}
                headers={SIMPLE_DATA.headers}
                paginated
                paginationProps={{
                    count: _.size(SIMPLE_DATA.data),
                    onChangePage: jest.fn(),
                    page: 0,
                    rowsPerPage: 10
                }}
            />
        );

        // Expect TablePagination to exist
        chai.expect(table.find("ForwardRef(TablePagination)")).to.have.lengthOf(1);

        // Expect next page button to be clickable and previous page button to be disabled
        let nextPgBtn = table.find("ForwardRef(IconButton)").at(1);
        let prevPgBtn = table.find("ForwardRef(IconButton)").at(0);
        chai.expect(nextPgBtn.prop("disabled")).to.be.false;
        chai.expect(prevPgBtn.prop("disabled")).to.be.true;
    });
});