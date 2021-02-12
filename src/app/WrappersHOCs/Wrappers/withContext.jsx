import React, {PureComponent} from "react";
import _ from "lodash";

/**
 * Wraps a component with a Context, passing the context's information to the component
 *
 * @example
 * const ContextedComponent = withContext(SampleContext, "sampleData")(MyComponent);
 * Inside ContextedComponent, the data from that context would retrieved from [this.props.sampleData]
 *
 * This also works for Context.Providers, exemplified below
 * @example
 * const WrappedProvider = withContext(SampleContext)(ContextProvider);
 * 
 * @param {React.Context} Context - The context that wraps the specified component
 * @param {String} propName - The name of the prop to pass to the wrapped component
 */
export function withContext(Context, propName = "context") {
    return (WrappedComponent) => wrap(Context, propName, WrappedComponent);
}

/**
 * Wraps a component in multiple Contexts, passing all of their info to the component
 *
 * @example
 * const MultiWrappedComponent = withMultiContext({"one": ContextOne, "two": ContextTwo})(MyComponent);
 * Inside MultiWrappedComponent, the data would be retrieve as [this.props.one] and [this.props.two]
 *
 * @param {{String: Context}} map - A collection of prop names as the field and the context as the value
 */
export function withMultiContext(map) {
    return (WrappedComponent) => (
        _.reduce(Object.keys(map), (Component, key) => {
            wrap(map[key], key, Component)
        }, WrappedComponent)
    );
}

/**
 * Wraps a component with one or more Contexts
 *
 * @param {React.Context} Context - The context that wraps the specified component
 * @param {String} propName - Key to access the context's information from the wrapped component
 * @param {React.Component} WrappedComponent - Component to wrapped in the context and consume the data
 *
 * @return {React.Component}
 */
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