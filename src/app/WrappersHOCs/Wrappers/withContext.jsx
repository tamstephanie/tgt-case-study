import React, {PureComponent} from "react";
import _ from "lodash";

export function withContext(Context, propName = "context") {
    return (WrappedComponent) => wrap(Context, propName, WrappedComponent);
}

export function withMultiContext(map) {
    return (WrappedComponent) => (
        _.reduce(Object.keys(map), (Component, key) => {
            wrap(map[key], key, Component)
        }, WrappedComponent)
    );
}

function wrap(Context, propName, WrappedComponent) {
    class Connected extends PureComponent {
        render() {
            return (
                <Context.Consumer>{context => (
                    <WrappedComponent {...{[propName]: context, ...this.props}} />
                )}</Context.Consumer>
            )
        }
    }

    Connected.WrappedComponent = WrappedComponent;
    let wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "UnknownComponent";
    let consumerName = Context.Consumer.displayName || Context.Consumer.name || "UnknownContext";
    Connected.displayName = `${wrappedComponentName}(${consumerName}.${propName})`;

    return Connected;
}