"use strict";

process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.NODE_PATH = ".";
process.env.PUBLIC_URL = "";

process.on("unhandledRejection", (err) => {
    throw err;
});

//
const fs = require("graceful-fs");
const _ = require("lodash");
const jest = require("jest");

function runner() {
    let argv = process.argv.slice(2);
    let blindIndex = argv.indexOf("--blind");
    if (blindIndex >= 0) {
        argv[blindIndex] = "";
    } else if (!process.env.CI && argv.indexOf("--coverage") === -1 && argv.indexOf("--bail") === -1) {
        argv.push("--watch");
    }

    jest.run(argv);
}

runner();