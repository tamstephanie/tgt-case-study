import React, {Component} from "react";
import _ from "lodash";
import {hasValue} from "app/Utilities/Utilities";

/**
 * Creates a higher-order-component (HOC) that renders a component based on whether the evaluation
 * condition returns true. Also, the evaluation condition has access to any props passed to it since
 * it is bound to the HOC.
 * 
 * @param {Class} WrappedComponent - The component to wrap
 * @param {Function | String | String[]} evaluateCondition - Evaluation condition that 
 * @param {*} alternative - Handles rendering if the evaluation condition is false
 * 
 * @return {React.Component} A component that accepts an evaluation condition in addition to the wrapped
 * component's props
 */
export const conditionalExistence = function (WrappedComponent, evaluationCondition, alternative) {
    class ConditionalExistence extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            let evaluation;

            if (_.isFunction(evaluationCondition)) {
                evaluation = evaluationCondition(this.props);
            } else if (_.isArray(evaluationCondition)) {
                evaluation = _.every(evaluationCondition, prop => hasValue(this.props[prop]));
            } else {
                evaluation = hasValue(this.props[evaluateCondition]);
            }

            let wrappedRender = !_.isUndefined(alternative) ? alternative : null;
            if (evaluation) {
                wrappedRender = <WrappedComponent {...this.props} />;
            } else if (_.isFunction(alternative)) {
                wrappedRender = alternative(this.props);
            }

            return <div>{wrappedRender}</div>;
        }
    }

    ConditionalExistence.displayName =
        `ConditionalExistence(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    Object.getOwnPropertyNames(WrappedComponent).forEach(propertyName => (
        typeof WrappedComponent[propertyName] === "function" &&
        (ConditionalExistence[propertyName] = WrappedComponent[propertyName])
    ));

    return ConditionalExistence;
};