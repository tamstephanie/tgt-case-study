import React from "react";
import chai from "chai";
import {mount} from "enzyme";

import PaginationActions from "../PaginationActions";

const onChangePageMock = jest.fn();

describe("PaginationActions", () => {
    it("should render 4 buttons to control pagination", () => {
        let pgBtns = mount(
            <PaginationActions
                count={15}
                onChangePage={onChangePageMock}
                page={1}
                rowsPerPage={5}
            />
        );

        // Expect 4 IconButtons to be present
        chai.expect(pgBtns.find("ForwardRef(IconButton)")).to.have.lengthOf(4);
    });

    it("clicking a button should call onChangePage()", () => {
        let pgBtns = mount(
            <PaginationActions
                count={15}
                onChangePage={onChangePageMock}
                page={1}
                rowsPerPage={5}
            />
        );

        // Click previous page button and expect onChangePage() is called
        pgBtns.find("ForwardRef(IconButton)").at(1).simulate("click");
        expect(onChangePageMock).toHaveBeenCalledTimes(1);
    });

    it("disables the previous and first page buttons when on the first page", () => {
        let pgBtns = mount(
            <PaginationActions
                count={15}
                onChangePage={onChangePageMock}
                page={0}
                rowsPerPage={5}
            />
        );

        // Expect the first two page buttons to be disabled
        chai.expect(pgBtns.find("ForwardRef(IconButton)").at(0).prop("disabled")).to.be.true;
        chai.expect(pgBtns.find("ForwardRef(IconButton)").at(1).prop("disabled")).to.be.true;
    });

    it("disables the next and last page buttons when on the last page", () => {
        let pgBtns = mount(
            <PaginationActions
                count={15}
                onChangePage={onChangePageMock}
                page={3}
                rowsPerPage={5}
            />
        );

        // Expect the first two page buttons to be disabled
        chai.expect(pgBtns.find("ForwardRef(IconButton)").at(2).prop("disabled")).to.be.true;
        chai.expect(pgBtns.find("ForwardRef(IconButton)").at(3).prop("disabled")).to.be.true;
    });
});