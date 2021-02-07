// Specifically used for Jest
module.exports = {
    "env": {
        "test": {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ],
            "plugins": [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime"
            ]
        }
    }
};