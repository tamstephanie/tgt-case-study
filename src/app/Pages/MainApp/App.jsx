import React, {Component} from "react";
import _ from "lodash";
import {HashRouter, Route, Switch} from "react-router-dom";

import MainApp from "./MainApp";

class App extends Component {
    constructor() {
        super();
        this.unloadApp = this.unloadApp.bind(this);
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.unloadApp);
    }

    componentWillUnmount() {
        this.unloadApp();
        window.removeEventListener("beforeunload", this.unloadApp);
    }

    unloadApp() {
        sessionStorage.clear();
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" component={MainApp} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;