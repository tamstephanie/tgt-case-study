import React, {Component} from "react";
import _ from "lodash";

import MountedComponent from "app/Utilities/MountedComponent";

const DEFAULTS = {
    startNow: false,
    wait: 5000
};

class RestfulComponent extends MountedComponent {
    constructor(props) {
        super(props);
        /**
         * List of polling functions
         * @type {Function[]}
         */
        this._polls = [];

        //------------------ EXTENDED COMPONENT HANDLING ------------------
        /**
         * This section handles the React component lifecycle methods.
         *
         * Each method has basic functionalities built into it to standardize the lifecycle method.
         * It also combines the extended component's lifecycle method
         */

        /**
         * 
         */
        let extenderDidMount = this.componentDidMount;
        this.componentDidMount = (prevProps, prevState) => {
            this._mounted = true;

            // Automatically call all polling functions, if any, 
            _.each(this._polls, (poll) => {
                poll.startNow && poll.pollFn(...poll.initArgs)
            });

            if (!_.isNil(extenderDidMount)) {
                extenderDidMount = extenderDidMount.bind(this);
                extenderDidMount(prevProps, prevState);
            }
        };

        /**
         * 
         */
        let extenderWillUnmount = this.componentWillUnmount;
        this.componentWillUnmount = () => {
            this._mounted = false;

            // Stop any polling functions when the component unmounts and clear the list of polling functions
            _.each(this._polls, (poll) => {
                clearTimeout(poll.id);
            });
            this._polls = [];

            // 
            if (!_.isNil(extenderWillUnmount)) {
                extenderWillUnmount = extenderWillUnmount.bind(this);
                extenderWillUnmount();
            }
        };

        //------------------ CREATING POLLING FUNCTIONS ------------------
        /**
         * 
         */
    }
};

export default RestfulComponent;