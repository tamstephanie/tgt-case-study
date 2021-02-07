module.exports = () => ({
    // collectCoverage: true,
    collectCoverageFrom: ["app/**/*.{js, jsx}"],
    moduleFileExtensions: ["js", "json", "jsx", "node", "web.js", "web.jsx"],
    rootDir: ".",
    setupFiles: [
        "<rootDir>/config/jest/console-overrides.js",
        "<rootDir>/config/jest/polyfills.js",
        "<rootDir>/config/jest/setup.js"
    ],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testPathIgnorePatterns: [
        "<rootDir>/content",
        "<rootDir>/node_modules"
    ],
    watchPathIgnorePatterns: [
        "<rootDir>/content",
        "<rootDir>/node_modules"
    ],
    verbose: true,
    watchman: true
});