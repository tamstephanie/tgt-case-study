import _ from "lodash";

const showWarnings = false;

let error = console.error;
if (showWarnings) {
    console.warn = (message) => {
        console.warn(message);
    };
} else {
    console.warn = () => {};
}

console.debug = () => {};