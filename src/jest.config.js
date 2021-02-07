module.exports = () => ({
    collectCoverage: true,
    collectCoverageFrom: ["app/**/*.{js, jsx}"],
    rootDir: "src/",
    setupFiles: ["<rootDir>/config/jest/setup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    verbose: true,
});