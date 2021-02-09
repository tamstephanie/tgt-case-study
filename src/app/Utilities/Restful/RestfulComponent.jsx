import React from "react";
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
        this.createPolling = (pollFn, options = DEFAULTS, ...initArgs) => {
            options = _.defaultsDeep(options, DEFAULTS);
            let index = _.size(this._polls);
            this._polls.push({id: null, pollFn, initArgs, ...options});

            /**
             * Function queues a polling in [wait] milliseconds. After the wait, the timer is reset and a new one
             *  is prepared
             * 
             * @param {...*} repollArgs - Any new arguments supplied to the polling function, replacing inital
             *  arguments, if provided
             */
            return (...repollArgs) => {
                let args = !_.isEmpty(repollArgs) ? repollArgs : initArgs;
                let [id, repollFn = () => {}, repollWait] = _.at(this._polls[index], ["id", "pollFn", "wait"]);
                clearTimeout(id);
                id = setTimeout(() => repollFn(...args), repollWait);
                this._polls[index] = {...this._polls[index], id};

                /**
                 * Temporarily stops polling until the polling function is called again
                 */
                const halt = () => {
                    clearTimeout(id);
                };

                /**
                 * Terminates the current polling function
                 * @throws {Exception} on attempt to repoll
                 */
                const terminate = () => {
                    clearTimeout(id);
                    this._polls[index] = {
                        id: -1,
                        wait: options.wait,
                        pollFn: () => {
                            throw new Error("This polling function has been terminated");
                        }
                    };
                };

                /**
                 * Pauses any polling (ongoing and further), until resumed
                 */
                const pause = () => {
                    clearTimeout(id);
                    this._polls[index] = {
                        id,
                        wait: repollWait,
                        pollFn: () => {
                            console.warn(`This polling function was already paused: ${id}`);
                        },
                        _pausedFn: pollFn
                    };
                };

                /**
                 * Resumes polling operations
                 *
                 * @param {...*} arguments - Any new arguments supplied to the polling function, replacing the
                 *  initial arguments, if provided
                 */
                const resume = () => {
                    clearTimeout(id);
                    let args = _.size(arguments) > 0 ? arguments : initArgs;
                    let pausedFn = this._polls[index]._pausedFn;
                    this._polls[index] = {
                        id: setTimeout(() => pausedFn(...args), repollWait),
                        wait: repollWait,
                        pollFn: pausedFn,
                        _pausedFn: () => {
                            throw new Error("Attempted to resume polling function after it was already resumed");
                        }
                    };
                };

                return {halt, terminate, pause, resume};
            }
        };
    }
};

export default RestfulComponent;