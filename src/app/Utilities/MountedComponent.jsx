import React, {Component} from "react";
import _ from "lodash";

/**
 * Component that works with any stateful components. It checks if the component is mounted and
 * whether setting state is allowed.
 * Note that this is very similar to {@link RestfulComponent}. The main difference is that this component
 * doesn't involve any polling
 */
class MountedComponent extends Component {
    constructor(props) {
        super(props);
        /**
         * Identifier for the component. Can be uesd for styling
         * @type {String}
         */
        this._tag = _.kebabCase(this.constructor.name);
        /**
         * Indicates if the component mounted, and if so, permits setting state
         * @type {Boolean}
         */
        this._mounted = false;

        //------------------ EXTENDED COMPONENT HANDLING ------------------
        /**
         * This section handles the React component lifecycle methods.
         *
         * Each method has basic functionalities built into it to standardize the lifecycle method.
         * It also combines the extended component's lifecycle method
         */
        let extenderDidMount = this.componentDidMount;
        this.componentDidMount = (prevProps, prevState) => {
            this._mounted = true;
            if (!_.isNil(extenderDidMount)) {
                extenderDidMount = extenderDidMount.bind(this);
                extenderDidMount(prevProps, prevState);
            }
        };

        let extenderWillUnmount = this.componentWillUnmount;
        this.componentWillUnmount = () => {
            this._mounted = false;
            if (!_.isNil(extenderWillUnmount)) {
                extenderWillUnmount = extenderWillUnmount.bind(this);
                extenderWillUnmount();
            }
        };

        let extenderSetState = this.setState.bind(this);
        this.setState = (newState, callback) => {
            if (this._mounted) {
                extenderSetState(newState, callback);
            }
        };
        this.setState = this.setState.bind(this);
    }
}

export default MountedComponent;