import React, {Component} from "react";
import _ from "lodash";

const DEFAULTS = {
    startNow: false,
    wait: 5000
};

/**
 * Component that works with any components that make RESTful API calls. It checks if the component
 * is mounted and whether setting state is allowed
 */
class RestfulComponent extends Component {
    constructor(props) {
        super(props);
        /**
         * Indicates if the component mounted, and if so, permits setting state
         * @type {Boolean}
         */
        this._mounted = false;
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

        let extenderWillUnmount = this.componentWillUnmount;
        this.componentWillUnmount = () => {
            this._mounted = false;

            // Stop any polling functions when the component unmounts and clear the list of polling functions
            _.each(this._polls, (poll) => {
                clearTimeout(poll.id);
            });
            this._polls = [];
            if (!_.isNil(extenderWillUnmount)) {
                extenderWillUnmount = extenderWillUnmount.bind(this);
                extenderWillUnmount();
            }
        };

        let extenderSetState = this.setState.bind(this);
        this.setState = (newState, callbackFn) => {
            if (this._mounted) {
                extenderSetState(newState, callbackFn);
            }
        };

        //------------------ CREATING POLLING FUNCTIONS ------------------
        /**
         * Function that handles creating and tracking bound 
         * @param {Function} pollFn - Method to be polled
         * @param {Object} options - Polling configuration options
         * @param  {...any} initArgs - Any initial arguments to pass to the polling function
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
             * 
             * @return {{Function}}
             *  @property {Function} halt - Function that temporarily stops polling until the polling function
             *  is called again
             *  @property {Function} terminate - Function that interrupts polling and and destroys any currently
             *  running polls, permanently disabling them
             *  @property {Function} pause - Function that interrupts the current polling and pauses the polling 
             *  @property {Function} resume - Function that interrupts the current polling state and resumes
             *  the polling if the polling was previously paused
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
            };
        };
    }
};

export default RestfulComponent;